const express = require("express")
const app = express()

require('dotenv').config()

const port = process.env.PORT || 3000
const host = process.env.HOST


app.listen (port, host, () => {
    console.log (`Listenting on port ${port}...`)
})

app.get ("/", (req,res) => {
    res.send("Hello2")
})

