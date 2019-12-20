const Quiz = require('../models/quiz-model')
const _ = require('lodash')
const statusCode = require('http-status-codes');

quizSave = (quiz) => {
    return quiz.save()
}

quizSaveReturn = (res, quiz, message, statusCode) => {
    return res.status(statusCode).json({
        success: true,
        id: quiz._id,
        message: message,
    })
}

createQuiz = (req, res) => {
    const body = req.body
    
    if(!body || _.isEmpty(body) || !req.hasOwnProperty('body')){
        return res.status(statusCode.BAD_REQUEST).json({
            success: false,
            message: 'You must provide a Quiz',
        })
    }

    const quiz = new Quiz(body)

    if(!quiz){
        return res.status(statusCode.BAD_REQUEST).json({
            success: false,
            message: err
        })
    }

    quizSave(quiz)
    quizSaveReturn(res, quiz, 'Quiz Created!', statusCode.ACCEPTED )
}

updateQuiz = (req, res) => {
    const body = req.body

    if(!body){
        return res.status(statusCode.BAD_REQUEST).json({
            success: false,
            message: 'Your must provide a valid body to update',
        })
    }

    Quiz.findOne({ _id: req.params.id }, (err, quiz) => {
        if(err){
            return res.status(statusCode.NOT_FOUND).json({
                success: false,
                message: err
            })
        }

        if(body.name !== undefined)  
            quiz.name = body.name
        else
            quiz.name = quiz.name

        if(body.description !== undefined) 
            quiz.description = body.description
        else    
            quiz.description = quiz.description

        if(body.type !== undefined) 
            quiz.type = body.type
        else   
            quiz.type = quiz.type

        if(body.status !== undefined) 
            quiz.status = body.status
        else 
            quiz.status = quiz.status

        try {
            quizSave(quiz)
            quizSaveReturn(res, quiz, 'Quiz updated!', statusCode.ACCEPTED )
        } catch (error) {
            quizSaveReturn(res, quiz, error, statusCode.NOT_FOUND )
        }
    })
}

deleteQuiz = async(req,res) => {
    await Quiz.findOneAndDelete({ _id: req.params.id }, (err, quiz) => {
            if(err){
                return res.status(statusCode.BAD_REQUEST).json({ 
                    success: false, 
                    message: err
                })
            }

            if(!quiz){
                return res
                    .status(statusCode.NOT_FOUND)
                    .json({ 
                        success: false, 
                        message: `Quiz not found` 
                    })
            }

            return res
                .status(statusCode.ACCEPTED)
                .json({ 
                    success: true, 
                    data: quiz 
                })
        }).catch(err => console.log(err))
}

getQuizById = async (req, res) => {
    await Quiz.findOne({ _id: req.params.id }, (err, quiz) => {
        if(err){
            return res.status(statusCode.BAD_REQUEST).json({ 
                success: false, 
                message: err
            })
        }

        if(!quiz){
            return res
                .status(statusCode.NOT_FOUND).json({ 
                    success: false, 
                    message: `Note not found` 
                })
        }

        return res.status(statusCode.ACCEPTED).json({
            success: true, 
            data: quiz
        })
    }).catch(err => console.log(err))    
}

getQuiz = async (req, res) => {
    await Quiz.find({}, (err, quiz) => {
        if(err){
            return res.status(statusCode.BAD_REQUEST).json({ 
                success: false, 
                message: err
            })
        }

        if(!quiz.length){
            return res
                .status(statusCode.NOT_FOUND).json({ 
                    success: false, 
                    message: `Note not found` 
                })
        }

        return res
            .status(statusCode.ACCEPTED).json({ 
                success: true, 
                data: quiz 
            })
    }).catch(err => console.log(err))
}

module.exports = {
    createQuiz,
    updateQuiz,
    deleteQuiz,
    getQuizById,
    getQuiz
}