const express = require("express");
const { User } = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { SECRET } = require("../middleware/user");

router.post("/signup", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user) {
            return res.status(403).json({ message: "User already exists" });
        }

        const newUser = new User({ username, password });
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, SECRET, { expiresIn: "1h" });
        res.json({
            message: "User created",
            token
        })
    } catch (err) {
        res.status(500).json({ 
            message: "Error creating user",
        });
    }
});

router.post("/signin", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (user) {
            const token = jwt.sign({ userId: user._id }, SECRET, { expiresIn: "1h" });
            return res.json({
                message: "User signed in",
                token
            });
        } else {
            return res.status(403).json({ message: "Invalid username or password" });
        }
    } catch (err) {
        res.status(500).json({ 
            message: "Error signing in",
        });
    }
});

module.exports = router;