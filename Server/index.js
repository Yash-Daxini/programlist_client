require('dotenv').config()
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());

const programRouter = require("./routes/programs");

const topicRouter = require("./routes/topic");

const userRouter = require("./routes/user");

app.use("/programs",programRouter);

app.use("/topic",topicRouter);

app.use("/user",userRouter);

app.listen(process.env.PORT,()=>console.log(`Port: ${process.env.PORT}`))