import express from "express";
import { APIError, asyncHandler } from "../middleware/errorHandler.js";

const router = express.Router();

const items = [
  { id: 1, name: "Item One" },
  { id: 2, name: "Item Two" },
  { id: 3, name: "Item Three" },
  { id: 4, name: "Item Four" },
  { id: 5, name: "Item Five" },
];

router.get(
  "/items",
  asyncHandler(async (req, res) => {
    res.json(items);
  })
);

router.post(
  "/items",
  asyncHandler(async (req, res) => {
    if (!req.body) {
      throw new APIError("Name is required", 400);
    }

    const newItem = {
      id: items.length + 1,
      name: req.body.name,
    };
    items.push(newItem);
    res.status(201).json(newItem);
  })
);

export default router;
