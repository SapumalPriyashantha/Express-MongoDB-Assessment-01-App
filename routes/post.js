const express = require("express")
const app = express()
const router = express.Router()
const Post = require("../modules/post.model")

app.use(express.json())

router.post("/", async (req, res) => {
    const post = new Post({
        userId: req.body.userId,
        date: req.body.date,
        time: req.body.time,
        title: req.body.title,
        body: req.body.body,
    })

    try {
        const response = await post.save()
        res.send({
            status:"200",
            message: "Post Saved Successfully",
            data: response
        })
    } catch (err) {
        res.send("Error :" + err)
    }
})

router.get("/",async (req,res)=>{
    try {
        const response = await Post.find()
        res.send({
            status:"200",
            message: "Post Get All Successfully",
            data: response
        })
    } catch (err) {
        res.send("Error : " + err)
    }
})

router.get("/getAllPostByUserId/:id", async (req, res) => {
    try {
        const response = await Post.find({userId:req.params.id})
        res.send({
            status:"200",
            message: "Successfully Get All Post Relevant User",
            data: response
        })
    } catch (err) {
        res.send("Error : " + err)
    }
})

router.get("/:id", async (req, res) => {
    try {
        const response = await Post.findById(req.params.id)
        res.send({
            status:"200",
            message: "Get post Successfully",
            data: response
        })
    } catch (err) {
        res.send("Error : " + err)
    }
})

router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        post.date = req.body.date
        post.time = req.body.time
        post.title = req.body.title
        post.body = req.body.body
        const response = await post.save()
        res.send({
            status:"200",
            message: "Post Updated Successfully",
            data: response
        })
    } catch (err) {
        res.send("Error :" + err)
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        const response = await post.remove()
        res.send({
            status:"200",
            message: "Post Deleted Successfully",
            data: response
        })
    } catch (err) {
        res.send("Error : " + err)
    }
})

module.exports = router