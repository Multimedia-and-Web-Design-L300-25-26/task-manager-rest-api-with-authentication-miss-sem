import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createTask, getTasks, deleteTask } from "../controllers/taskController.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createTask);
router.get("/", getTasks);
router.delete("/:id", deleteTask);

export default router;