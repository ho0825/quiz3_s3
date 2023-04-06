const express = require('express')
const app = express()
const port = 3000

app.use(express.json())

app.post('/login', (req, res) => {
    console.log(req.body)

    res.send('Log in')
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
