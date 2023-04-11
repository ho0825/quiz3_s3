const express = require('express')
const app = express()
const port = 3000

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

    res.send(result)
})

app.get('/', (req, res) => {
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
