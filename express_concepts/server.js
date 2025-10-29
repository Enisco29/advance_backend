import "dotenv/config";
import express from "express";
import configureCors from "./config/corsConfig.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(configureCors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
