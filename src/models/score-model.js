const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Score = new Schema(
    {
        quizName: String,
        quizId: String,
        userId: String,
        score: String,
        nonAnswered: Array
    },
    { timestamps: true }
)

module.exports = mongoose.model('score', Score)