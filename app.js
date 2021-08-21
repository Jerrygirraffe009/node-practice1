const express = require("express")
const app = express()

const courses = [
    {id: 1, name: "Math"},
    {id: 1, name: "History"},
    {id: 1, name: "Economics"}
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
