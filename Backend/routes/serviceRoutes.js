import express from "express";

import {
  createService,
  getServices,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";

const router = express.Router();

// CREATE SERVICE
router.post("/", createService);

// GET ALL SERVICES
router.get("/", getServices);

// UPDATE SERVICE
router.put("/:id", updateService);

// DELETE SERVICE
router.delete("/:id", deleteService);

export default router;