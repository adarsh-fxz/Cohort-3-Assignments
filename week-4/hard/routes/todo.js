const { Router } = require("express");
const adminMiddleware = require("../middleware/user");
const { Todo, User } = require("../database");
const router = Router();
const jwt = require('jsonwebtoken');

// todo Routes
router.post('/', async (req, res) => {
    // Implement todo creation logic
    try {
        const token = req.headers.token;

        if (!token) {
            return res.status(401).json({
                message: "Access denied"
            });
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(verified.id);

        if (!user) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        const { title, description, status } = req.body;

        const todo = await Todo.create({
            userId: user._id,
            title,
            description,
            status
        });

        res.status(201).json({
            message: "Todo created successfully",
            todo
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error"
        });
    }

});

router.put('/', adminMiddleware, async (req, res) => {
    // Implement update todo  logic
    try {
        const userId = req.userId;
        const todoId = req.headers.todoid;
        const { title, description, status } = req.body;

        const todo = await Todo.updateOne({
            userId: userId,
            _id: todoId
        }, {
            title,
            description,
            status
        })

        res.json({
            message: "Todo updated successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error"
        });
    }
});

router.delete('/', adminMiddleware, async (req, res) => {
    // Implement delete todo logic
    try {
        const userId = req.userId;
        const todoId = req.headers.todoid;

        const todo = await Todo.deleteOne({
            userId: userId,
            _id: todoId
        });

        res.json({
            message: "Todo deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error"
        });
    }
});

router.delete('/:id', adminMiddleware, async (req, res) => {
    // Implement delete todo by id logic
    try {
        const userId = req.userId;
        const todoId = req.params.id;

        const todo = await Todo.deleteOne({
            userId: userId,
            _id: todoId
        });

        res.json({
            message: "Todo deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error"
        });
    }
});


router.get('/', adminMiddleware, (req, res) => {
    // Implement fetching all todo logic
});

router.get('/:id', adminMiddleware, (req, res) => {
    // Implement fetching todo by id logic
});

module.exports = router;