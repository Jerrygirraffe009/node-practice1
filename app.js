const express = require("express")
const app = express()

//app.set('view-engine', 'ejs')

app.use(express.json())    // use req.body.<params>
require('dotenv').config() //Read from .env file

// ----- Initialize App (begin)
const courses = [
    { id: 1, name: "Math"},
    { id: 2, name: "History"},
    { id: 3, name: "Economics"}
]

const port = process.env.PORT
// ----- Initialize App (end)

/* ---------------------------- */

// ----- Actual API code (begin)
app.listen (port, () => {
    console.log (`Listening on port ${port}...`)
})

app.get ("/", (req,res) => {
    res.send("Welcome to the API")
})


app.get ("/courses", (req,res) => {
    res.send(courses)
})

app.get("/course/:id", (req, res)=>{
    course = courses.find ( (c) => c.id === parseInt(req.params.id))
    //course = courses.find ( (c) => c.name === req.params.name)

    if (!course) res.status(404).send("Course not found")
    
    res.send (course)
})

app.post ("/addcourse", (req,res) => {
    courses.push (
        { id: courses.length +1, name: req.body.name }
)
    res.send(courses)
})

app.put("/updatecourse", (req, res)=>{
    course = courses.find ( (c) => c.id === parseInt(req.body.id))
    //course = courses.find ( (c) => c.name === req.params.name)

    if (!course) res.status(404).send("Course not found")
    
    course.name = req.body.name

    res.send(course)
})
// ----- Actual API code (end)


const users =[]

app.use(express.urlencoded({extended: false}))
//this is to allow form submission to allow to access req.body.<param>

const bcrypt = require ('bcrypt')
//npm i bcrypt
//npm i ejs

app.get ("/welcome", (req,res) => {
    res.render("index.ejs", { name: "Joe" })
})

app.get ("/login", (req,res) => {
    res.render("login.ejs")
})

app.get ("/register", (req,res) => {
    res.render("register.ejs", { name: "Joe" })
})

app.post ("/register", async (req,res) => {

    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    users.push ({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    console.log(users)
    res.redirect("/login")
})