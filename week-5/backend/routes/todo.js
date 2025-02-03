const express = require("express");
const router = express.Router();
const { authenticateJwt } = require("../middleware/user");
const { Todo } = require("../db");

router.use(authenticateJwt);

router.post("/", async (req, res) => {
    const createPayload = req.body;

    if (!createPayload.title) {
        return res.status(400).json({
            message: "You sent the wrong inputs"
        });
    }

    try {
        const newTodo = await Todo.create({
            title: createPayload.title,
            completed: false,
            userId: req.userId
        });

        res.status(201).json({
            message: "Todo created",
            todo: newTodo
        });
    } catch (err) {
        res.status(500).json({
            message: "Error creating todo",
            error: err.message
        });
    }
});

router.get("/", async (req, res) => {
    try {
        const todos = await Todo.find({ userId: req.userId });

        res.json({
            todos
        });
    } catch (err) {
        res.status(500).json({
            message: "Error fetching todos",
            error: err.message
        });
    }

});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updatePayload = req.body;

    if (typeof updatePayload.completed === "undefined") {
        return res.status(400).json({
            message: "You must provide a completed status."
        });
    }

    try {
        const result = await Todo.updateOne(
            { _id: id },
            { completed: updatePayload.completed }
        );

        res.json({
            msg: "Todo marked as completed",
        });
    } catch (err) {
        res.status(500).json({
            message: "Error updating todo",
            error: err.message
        });
    }
});

module.exports = router;