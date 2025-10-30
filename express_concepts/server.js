import "dotenv/config";
import express from "express";
import configureCors from "./config/corsConfig.js";
import { addTimestamp, requestLogger } from "./middleware/customMiddleware.js";
import { globalErrorHandler } from "./middleware/errorHandler.js";
import { urlVersion } from "./middleware/apiVersioning.js";
import { createBasicRateLimiter } from "./middleware/rateLimiting.js";
import itemRoutes from "./routes/item-routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(requestLogger);
app.use(addTimestamp);
app.use(urlVersion("v1"));

app.use(configureCors());
app.use(createBasicRateLimiter(2, 15 * 60 * 1000)); //100 request per 15 minutes
app.use(express.json());

app.use("/api/v1", itemRoutes);

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
