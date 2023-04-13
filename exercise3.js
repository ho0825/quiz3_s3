const express = require('express')
const app = express()
const port = 3000
const jwt = require('jsonwebtoken')

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

function login(reqUsername, reqPassword){
    let matchuser = dbmongoUsers.find(user => user.username == reqUsername)
    if (!matchuser) return "User not found!"

    
    if (matchuser.password == reqPassword){
        return matchuser
    }
    else {
        return "Wrong password!"
    }

}

function signup(reqUsername, reqPassword, reqName, reqEmail){
    dbmongoUsers.push({
        username : reqUsername,
        password : reqPassword,
        name : reqName,
        email : reqEmail,
    })
    return "Registered Successful"
}

function TokenGenerator(userData){
    const token = jwt.sign(
        userData, 'password',
        {expiresIn : 60} //expire time
    );
    return token
}

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
    console.log(req.body)

    let result = login(req.body.Username,req.body.Password)

    let token = TokenGenerator(result)
    res.send(token)
})

app.get('/utem', verifyToken, (req, res) => {
  res.send('Hello UTeM!')
})

app.post('/log', (req, res) => {
    res.send('Hi ho')
  })

app.get('/register', (req, res) => {
    res.send('Hi khoo, tan')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
