const express = require('express')
const mongoose = require('mongoose')

const user = require("./routes/user")
// const post = require("./routes/post1")

const app = express();
const port = 4000;

const url="mongodb://127.0.0.1/express"

mongoose.connect(url,{useNewUrlParser:true})

const con = mongoose.connection


con.on("open", () => {
    console.log('MongoDB connected!');
})

app.use(express.json())

app.use('/users', user)
// app.use('/post', post)

app.listen(port, () => {
    console.log(`app starting on ${port}`);
})
