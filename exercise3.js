const express = require('express')
const app = express()
const port = 3000
const jwt = require('jsonwebtoken')

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://hozheheng:password1234@cluster0.xqqtiji.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });

client.connect().then(res => {
    console.log(res)
})

// insert user info
let dbmongoUsers = [
    {
        username : "ho",
        password : 1234,
        name : "HO",
        email : "ho@utem.student.edu.my"
    },
    {
        username : "khoo",
        password : 12345,
        name : "KHOO",
        email : "khoo@utem.student.edu.my"
    }
]

//log in function
async function login(reqUsername, reqPassword){
    let matchuser = await client.db('benr_2434').collection('user').findOne(
        {
            $and:  [
                {username: {$eq: reqUsername}},
                {password: {$eq: reqPassword}}
            ]
        })

    console.log(matchuser)
    
    if (!matchuser) 
        return "User not found!"
    
    else if (matchuser.password == reqPassword){
        return "Log in successful"
        //return matchuser
    }
    else if ((matchuser.password != reqPassword)) {
         return "Wrong password!"
    }
}

//sign up function
function signup(reqUsername, reqPassword, reqName, reqEmail){
    client.db('benr_2434').collection('user').insertOne({
        username : reqUsername,
        password : reqPassword,
        name : reqName,
        email : reqEmail,
    })
    // dbmongoUsers.push({
    //     username : reqUsername,
    //     password : reqPassword,
    //     name : reqName,
    //     email : reqEmail,
    // })
    return "Registered Successful"
}

//generate random token
function TokenGenerator(userData){
    const token = jwt.sign(
        userData, 'password',
        {expiresIn : 60} //expire time
    );
    return token
}

//verify token with the token use to log in
function verifyToken(req, res, next){
    let header = req.headers.authorization
    console.log(header)
    let token = header.split(' ')[1]//Authorization: Bearer[0] Token[1], split bearer and token to two seperate item
  
    jwt.verify(token,'password',function(err,decoded){
      if(err){
        res.send("Invalid Token")
      }
  
      req.user = decoded
      next()
    })
  }

app.use(express.json())

app.post('/signup', (req, res) => {
    let result = signup (
        req.body.Username,
        req.body.Password,
        req.body.Name,
        req.body.Email
    )

    res.send(result)
})

app.post('/login', (req, res) => {
    //console.log(req.body)

    let result = login(
        req.body.Username,
        req.body.Password
    )

    res.send(result)

    //let token = TokenGenerator(result)
    //res.send(token)
})

app.get('/utem', verifyToken, (req, res) => {
  res.send('Hello UTeM!')
})

app.post('/log', (req, res) => {
    console.log(req.body)
  })

app.get('/register', (req, res) => {
    res.send('Hi khoo, tan')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
