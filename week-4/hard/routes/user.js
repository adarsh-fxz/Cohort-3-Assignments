const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Todo } = require("../database");
const { validateSignupData, hashPassword } = require("../auth");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User Routes
router.post('/signup', async (req, res) => {
    // Implement user signup logic
    try {
        const validationResult = validateSignupData(req.body);
        if (!validationResult.success) {
            return res.status(400).json({
                message: validationResult.error.errors
            });
        }
        
        const { username, email, password } = req.body;
        const hashedPassword = await hashPassword(password);
        
        await User.create({
            username,
            email,
            password: hashedPassword
        });
        
        res.status(201).json({
            message: "User created successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "User already exists or server error"
        });
    }
});

router.post('/login', async (req, res) => {
    // Implement user login logic
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            email
        })

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        const token = jwt.sign({
            id: user._id.toString()
        }, process.env.JWT_SECRET);

        res.json({
            token
        });
    } catch (error) {
        return res.status(500).json({
            message: "Server error"
        });
    }
});

router.get('/todos', userMiddleware, async (req, res) => {
    // Implement logic for getting todos for a user
    try {
        const todos = await Todo.find({
            userId: req.userId
        });

        res.json({
            todos
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error"
        });
    }
});

router.post('/logout', userMiddleware, (req, res) => {
    // Implement logout logic
    try {
        res.json({
            message: "Logged out successfully"
        }); 
    } catch (error) {
        return res.status(500).json({
            message: "Server error"
        });
    }
});

module.exports = router