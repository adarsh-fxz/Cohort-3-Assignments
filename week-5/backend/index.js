const express = require("express");
const cors = require("cors");
const { connectToDatabase } = require("./db");
const todoRouter = require("./routes/todo");
const userRouter = require("./routes/user");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/todo", todoRouter);
app.use("/user", userRouter);

async function main() {
    await connectToDatabase();
    app.listen(process.env.PORT, () => {
        console.log("Server is running on port", process.env.PORT);
    });
}

main();
