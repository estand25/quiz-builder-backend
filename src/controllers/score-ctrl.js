const Score = require('../models/score-model')
const _ = require('lodash')
const statusCode = require('http-status-codes');

scoreSave = (score) => {
    return score.save()
}

scoreSaveReturn = (res, score, message, statusCode) => {
    return res.status(statusCode).json({
        success: true,
        id: score._id,
        message: message,
    })
}

createScore = (req, res) => {
    const body = req.body
    
    if(!body || _.isEmpty(body) || !req.hasOwnProperty('body')){
        return res.status(statusCode.BAD_REQUEST).json({
            success: false,
            message: 'You must provide a score',
        })
    }

    const score = new Score(body)

    if(!score){
        return res.status(statusCode.NOT_FOUND).json({
            success: false,
            message: err
        })
    }

    scoreSave(score)
    scoreSaveReturn(res, score, 'Score Created!', statusCode.OK)
}

updateScore = (req, res) => {
    const body = req.body
    
    if(!body || _.isEmpty(body) || !req.hasOwnProperty('body')){
        return res.status(statusCode.BAD_REQUEST).json({
            success: false,
            message: 'Your must provide a valid body to update',
        })
    }

    Score.findOne({ _id: req.params.id }, (err, score) => {
        if(err){
            return res.status(statusCode.NOT_FOUND).json({
                success: false,
                message: err
            })
        }

        if(body.quizId !== undefined)
            score.quizId = body.quizId
        else
            score.quizId = body.quizId

        if(body.userId !== undefined)    
            score.userId = body.userId
        else
            score.userId = score.userId
        
        if(body.score !== undefined)    
            score.score = body.score
        else
            score.score = score.score
        
        if(score.nonAnswered !== undefined)
            score.nonAnswered = body.nonAnswered
        else
            score.nonAnswered = score.nonAnswered
            
        try {
            scoreSave(score)
            scoreSaveReturn(res, score, 'Score updated!', statusCode.OK)
        } catch (error) {
            scoreSaveReturn(res, score, 'Score not updated!', statusCode.NOT_FOUND)
        }
    })
}

deleteScore = async(req, res) => {
    await Score.findOneAndDelete(
        { _id: req.params.id }, (err, score) => {
            if(err){
                return res.status(statusCode.BAD_REQUEST).json({ 
                    success: false, 
                    message: err
                })
            }

            if(!score){
                return res
                    .status(statusCode.NOT_FOUND).json({ 
                        success: false, 
                        message: `Note not found` })
            }

            return res.status(statusCode.OK).json({ 
                success: true, 
                data: score 
            })
        }).catch(err => console.log(err))
}

getScoreById = async (req, res) => {
    await Score.findOne({ _id: req.params.id }, (err, score) => {
        if(err){
            return res.status(statusCode.BAD_REQUEST).json({ 
                success: false, 
                message: err
            })
        }

        if(!score){
            return res
                .status(statusCode.NOT_FOUND).json({ 
                    success: false, 
                    message: `Note not found` 
                })
        }

        return res.status(statusCode.OK).json({
            success: true, 
            data: score
        })
    }).catch(err => console.log(err))    
}

getScore = async (req, res) => {
    await Score.find({}, (err, score) => {
        if(err){
            return res.status(statusCode.BAD_REQUEST).json({ 
                success: false, 
                message: err
            })
        }

        if(!score.length){
            return res
                .status(statusCode.NOT_FOUND).json({ 
                    success: false, 
                    message: `Note not found` 
                })
        }

        return res
            .status(statusCode.OK).json({ 
                success: true, 
                data: score 
            })
    }).catch(err => console.log(err))
}

module.exports = {
    createScore,
    updateScore,
    deleteScore,
    getScoreById,
    getScore
}