const express = require("express");
const router = express.Router();
const { Task } = require("../models");
const authMiddleware = require("../middleware/auth");

// Create task
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;
    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      userId: req.user.userId,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error("Create task error:", error);
    res
      .status(400)
      .json({ message: "Failed to create task", error: error.message });
  }
});

// Get all tasks for user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { userId: req.user.userId },
      order: [["createdAt", "DESC"]],
    });

    res.json(tasks);
  } catch (error) {
    console.error("Get tasks error:", error);
    res
      .status(400)
      .json({ message: "Failed to get tasks", error: error.message });
  }
});

// Get single task
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOne({
      where: {
        id: req.params.id,
        userId: req.user.userId,
      },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    console.error("Get task error:", error);
    res
      .status(400)
      .json({ message: "Failed to get task", error: error.message });
  }
});

// Update task
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOne({
      where: {
        id: req.params.id,
        userId: req.user.userId,
      },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const { title, description, status, priority, dueDate } = req.body;
    await task.update({
      title,
      description,
      status,
      priority,
      dueDate,
    });

    res.json(task);
  } catch (error) {
    console.error("Update task error:", error);
    res
      .status(400)
      .json({ message: "Failed to update task", error: error.message });
  }
});

// Delete task
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOne({
      where: {
        id: req.params.id,
        userId: req.user.userId,
      },
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    await task.destroy();
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete task error:", error);
    res
      .status(400)
      .json({ message: "Failed to delete task", error: error.message });
  }
});

module.exports = router;
