const express = require('express')
const app = express()

const server = app.listen(3003, () => {
    console.log('start server: localhost:3000')
})

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')
app.engine('html', require('ejs').renderFile)

app.get('/', (req, res) => {
  res.render('index.html')
})

app.get('/about', (req, res) => {
  res.render('about.html')
})