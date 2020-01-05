const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Question = new Schema(
    {
        answer: String,
        options: Array,
        quizId: String,
        quizName: String,
        question: String,
        status: {
            type: Number, 
            default: 0},
        order: {
            type: Number, 
            default: 0},
        point: {
            type: Number, 
            default: 0},
        userId: String
    },
    { timestamps: true }
)

module.exports = mongoose.model('question', Question)