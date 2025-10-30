import "dotenv/config";
import express from "express";
import configureCors from "./config/corsConfig.js";
import { addTimestamp, requestLogger } from "./middleware/customMiddleware.js";
import {
  APIError,
  asyncHandler,
  globalErrorHandler,
} from "./middleware/errorHandler.js";
import { urlVersion } from "./middleware/apiVersioning.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(requestLogger);
app.use(addTimestamp);

app.use(configureCors());
app.use(express.json());

app.use("/api/v1", urlVersion("v1"));

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
