const express = require("express")
const app = express()
const router = express.Router()
const User = require("../modules/user.model")

app.use(express.json())

router.post("/", async (req, res) => {
    const user = new User({
        firstName: req.body.firstName,
        surname: req.body.surname,
        gender: req.body.gender,
        dateOfBirth: req.body.dateOfBirth,
        password: req.body.password,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email
    })

    try {
        const response = await user.save()
        res.send({
            status:"200",
            message: "User Saved Successfully",
            data: response
        })
    } catch (err) {
        res.send("Error :" + err)
    }
})

router.post("/login",async (req,res)=>{
    const surname=req.body.surname
    const password=req.body.password
    console.log(surname)
    console.log(password)
    try{
        const response=await User.findOne({surname: surname,password:password})
        if(response!==null){
            res.send({
                status:"200",
                message: "Successfully Login",
                data: response
            })
        }else {
            res.send({
                status:"200",
                message: "Login Unsuccessfully",
            })
        }
    }catch (err){
        res.send("Error :" + err)
    }
})

router.get("/", async (req, res) => {
    try {
        const response = await User.find()
        res.send({
            status:"200",
            message: "Users Get All Successfully",
            data: response
        })
    } catch (err) {
        res.send("Error : " + err)
    }
})

router.get("/:id", async (req, res) => {
    try {
        const response = await User.findById(req.params.id)
        res.send({
            status:"200",
            message: "Get user Successfully",
            data: response
        })
    } catch (err) {
        res.send("Error : " + err)
    }
})

router.put("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        user.firstName = req.body.firstName
        user.surname = req.body.surname
        user.gender = req.body.gender
        user.dateOfBirth = req.body.dateOfBirth
        user.password = req.body.password
        user.phoneNumber = req.body.phoneNumber
        user.email = req.body.email
        const response = await user.save()
        res.send({
            status:"200",
            message: "User Updated Successfully",
            data: response
        })
    } catch (err) {
        res.send("Error :" + err)
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const response = await user.remove()
        res.send({
            status:"200",
            message: "User Deleted Successfully",
            data: response
        })
    } catch (err) {
        res.send("Error : " + err)
    }
})

module.exports = router
