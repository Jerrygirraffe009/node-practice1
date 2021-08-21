const express = require("express")
const app = express()

app.use(express.json())


const courses = [
    { id: 1, name: "Math"},
    { id: 2, name: "History"},
    { id: 3, name: "Economics"}
]

require('dotenv').config()

const port = process.env.PORT || 3000
const host = process.env.HOST


app.listen (port, host, () => {
    console.log (`Listenting on port ${port}...`)
})

app.get ("/", (req,res) => {
    res.send("Hello2")
})



app.get ("/courses", (req,res) => {
    res.send(courses)

})

app.post ("/addcourse", (req,res) => {
    courses.push(
        { id: courses.length +1, name: req.body.name }
        )

    res.send(courses)
})

