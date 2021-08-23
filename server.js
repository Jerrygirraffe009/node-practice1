require("dotenv").config()

const express = require("express")
const app = express();

app.use(express.json())

const jwt = require("jsonwebtoken")

const posts = [
    { user: "Kyle", post: 1 },
    { user: "John", post: 2 }
]

app.listen(process.env.PORT, () => {
    console.log(`Listening on port 5000....`)
})



app.post("/login", (req,res) => {

    const userName = req.body.name
    user = { user: userName }

    const accessToken = generateAccessToken(user);

    res.send({accessToken: accessToken})
})

function generateAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1000s"})
}


app.get("/posts", validateAccessToken, (req, res) => {

    console.log (req.user)

    const post = posts.filter ( (c) => c.user == req.user.user)
    
    res.json(post)
})

function validateAccessToken(req, res, next) {
//get token
const authHeader = req.headers["authorization"]
const token = authHeader && authHeader.split(' ')[1]

if (token == null) res.status(401).send("Token not available")

jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,user)=> {
    if (err) res.status(403).send("Invalid token")

    console.log("token valid")

    req.user = user;

    next()

})

}