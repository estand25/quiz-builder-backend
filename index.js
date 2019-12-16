const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')

const user = require('./routes/user-router')
const quiz = require('./routes/quiz-router')
const question = require('./routes/question-router')
const userResponse = require('./routes/userResponse-router')
const score = require('./routes/score-router')

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