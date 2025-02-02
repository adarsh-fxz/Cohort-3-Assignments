const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/user");
const todoRouter = require("./routes/todo");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get("/healthy", (req, res) => res.send("I am Healthy"));

//  start writing your routes here
app.use("/user", userRouter);
app.use("/todo", todoRouter);

async function main() {
    await mongoose.connect(process.env.DB_URL);
    app.listen(port, () => console.log(`server is running at http://localhost:${port}`));
}

main()