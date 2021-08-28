const express = require("express")
const app = express()

const mysql = require("mysql")
const bcrypt = require("bcrypt")

app.use(express.json())

const generateAccessToken = require("./generateAccessToken")

require("dotenv").config()
const DB_HOST = process.env.DB_HOST
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_DATABASE = process.env.DB_DATABASE
const DB_PORT = process.env.DB_PORT

const port = process.env.PORT

const db = mysql.createPool({
    connectionLimit: 2,
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT
})

app.listen(port, ()=> console.log(`Server Started on port ${port}...`))



//CREATE USER
app.post("/createUser", async (req,res) => {

    const user = req.body.name;
    const hashedPassword = await bcrypt.hash(req.body.password,10);

    console.log (user)
    console.log (hashedPassword)
    
    db.getConnection( async (err, connection) => {

        if (err) throw (err)

        const sqlSearch = "Select * from userTable where user = ?"
        const search_query = mysql.format(sqlSearch,[user])
        const sqlInsert = "INSERT INTO userTable VALUES (0,?,?)"
        // ? will be replaced by values
        // ?? will be replaced by string
        const insert_query = mysql.format(sqlInsert,[user, hashedPassword])
        
        await connection.query (search_query, async (err, result) => {
            
            if (err) throw (err)
            console.log("------> Search Results")
            console.log(result.length)
            if (result.length != 0) {
                connection.release()
                console.log("------> User already exists")
                res.sendStatus(409)
            } else {
                await connection.query (insert_query, (err, result)=> {
                    connection.release()
                    if (err) throw (err)
                    console.log ("--------> Created new User")
                    console.log(result.insertId)
                    res.sendStatus(201)
                    })
            }
            

        })
     
            
        })

 })


//SEARCH USER BY NAME    
app.get("/searchUser/:name", (req, res)=> {

    const user = req.params.name
    console.log(user)
    console.log(typeof(user))

    db.getConnection ( async (err, connection)=> {
        if (err) throw (err)
        const sqlSearch = "Select * from userTable where user = ?"
        //                 SELECT * from userTable where user = "Jim"
        const search_query = mysql.format(sqlSearch,[user])
        console.log(search_query)
        await connection.query (search_query, (err, result) => {
            connection.release()
            if (err) throw (err)
            console.log("------> Search Results")
            console.log(result.length)
            if (result.length==0) {
                res.send(`${user} does not exist!`)
            } else {
                res.send (result)
            }
            
        })
    })
})


//LOGIN    
app.post("/login", (req, res)=> {

    const user = req.body.name
    const password = req.body.password

    db.getConnection ( async (err, connection)=> {
        if (err) throw (err)
        const sqlSearch = "Select * from userTable where user = ?"
        const search_query = mysql.format(sqlSearch,[user])
        
        await connection.query (search_query, async (err, result) => {
            connection.release()
            if (err) throw (err)

            if (result.length == 0) { 
                console.log("--------> User does not exist")
                res.sendStatus(404)
            } else {

                const hashedPassword = result[0].password

                if (await bcrypt.compare(password, hashedPassword)) {
                console.log("---------> Login Successful")
                console.log("---------> Generating accessToken")
                const token = generateAccessToken({user: user})
                //console.log(token)
                res.json({accessToken: token})

                 } else {
                res.send("Password incorrect!")
                }

            }

        })
    })
})









//VIEW ALL USERS
app.get("/getUsers", (req,res)=>{

    db.getConnection(async (err, connection)=> {
        if (err) throw (err)
        console.log("-------> MySQL Connected")

        await connection.query("Select * from userTable", (err,result)=>{
            connection.release()
            if (err) throw (err)
            console.log("--------> Got results from DB")
            res.json(result)
        })
   
    })
    
})




/*
const db = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: DB_PORT
})

db.connect((err)=> {
    if (err) { throw (err) }
    console.log ("--------> MySQL Connected")
})

*/

/*
//SEARCH USER BY POST    
app.post("/searchUser", (req, res)=> {

    const user = req.body.name
    console.log(user)
    console.log(typeof(user))

    db.getConnection ( async (err, connection)=> {
        if (err) throw (err)
        const sqlSearch = "Select * from userTable where user = ?"
        //                 SELECT * from userTable where user = "Jim"
        const search_query = mysql.format(sqlSearch,[user])
        console.log(search_query)
        await connection.query (search_query, (err, result) => {
            connection.release()
            if (err) throw (err)
            console.log("------> Search Results")
            console.log(result.length)
            res.sendStatus(200)
        })
    })
})
*/