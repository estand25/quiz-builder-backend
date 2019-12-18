const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./src/db')

const user = require('./src/routes/user-router')
const quiz = require('./src/routes/quiz-router')
const question = require('./src/routes/question-router')
const userResponse = require('./src/routes/userResponse-router')
const score = require('./src/routes/score-router')

const app = express()
const apiPost = 3000

app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error '));

app.use('/api', question)
app.use('/api', quiz)
app.use('/api', score)
app.use('/api', user)
app.use('/api', userResponse)

app.listen(apiPost, () => console.log(`Server running on port ${apiPost}`))