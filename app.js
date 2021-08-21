const express = require("express")
const app = express()

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