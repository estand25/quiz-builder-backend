const UserResponse = require('../models/userRespose-model')
const _ = require('lodash')
const statusCode = require('http-status-codes');

userResponseSave = (userResponse) => {
    return userResponse.save()
}

userResponseSaveReturn = (res, userResponse, message, statusCode) => {
    return res.status(statusCode).json({
        success: true,
        id: userResponse._id,
        message: message,
    })
}

createUserResponse = (req, res) => {
    const body = req.body
    
    if(!body || _.isEmpty(body) || !req.hasOwnProperty('body')){
        return res.status(statusCode.BAD_REQUEST).json({
            success: false,
            message: 'You must provide a UserResponse',
        })
    }

    const userResponse = new UserResponse(body)

    if(!userResponse){
        return res.status(statusCode.NOT_FOUND).json({
            success: false,
            message: err
        })
    }

    userResponseSave(userResponse)
    userResponseSaveReturn(res, userResponse, 'UserResponse Created!', statusCode.OK)
}

updateUserResponse = (req, res) => {
    const body = req.body

    if(!body || _.isEmpty(body) || !req.hasOwnProperty('body')){
        return res.status(statusCode.BAD_REQUEST).json({
            success: false,
            message: 'Your must provide a valid body to update',
        })
    }

    UserResponse.findOne({ _id: req.params.id }, (err, userResponse) => {
        if(err){
            return res.status(statusCode.NOT_FOUND).json({
                success: false,
                message: err
            })
        }

        if(body.response !== undefined)
            userResponse.response = body.response
        else
            userResponse.response = userResponse.response
        
        if(body.questionId !== undefined)
            userResponse.questionId = body.questionId
        else
            userResponse.questionId = userResponse.questionId
        
        if(body.userId !== undefined)
            userResponse.userId = body.userId
        else
            userResponse.userId = userResponse.userId

        try {
            userResponseSave(userResponse)
            userResponseSaveReturn(res, userResponse, 'UserResponse updated!', statusCode.OK)
        } catch (error) {
            userResponseSaveReturn(res, userResponse, 'UserResponse not updated!', statusCode.NOT_FOUND)
        }    
    })
}

deleteUserResponse = async(req, res) => {
    await UserResponse.findOneAndDelete(
        { _id: req.params.id }, (err, userResponse) => {
            if(err){
                return res.status(statusCode.BAD_REQUEST).json({ 
                    success: false, 
                    message: err
                })
            }

            if(!userResponse){
                return res
                    .status(statusCode.NOT_FOUND).json({ 
                        success: false, 
                        message: `Note not found` })
            }

            return res.status(statusCode.OK).json({ 
                success: true, 
                data: userResponse 
            })
        }).catch(err => console.log(err))
}

getUserResponseById = async (req, res) => {
    await UserResponse.findOne({ _id: req.params.id }, (err, userResponse) => {
        if(err){
            return res.status(statusCode.BAD_REQUEST).json({ 
                success: false, 
                message: err
            })
        }

        if(!userResponse){
            return res
                .status(statusCode.NOT_FOUND).json({ 
                    success: false, 
                    message: `Note not found` 
                })
        }

        return res.status(statusCode.OK).json({
            success: true, 
            data: userResponse
        })
    }).catch(err => console.log(err))    
}

getUserResponse = async (req, res) => {
    await UserResponse.find({}, (err, userResponse) => {
        if(err){
            return res.status(statusCode.BAD_REQUEST).json({ 
                success: false, 
                message: err
            })
        }

        if(!userResponse.length){
            return res
                .status(statusCode.NOT_FOUND).json({ 
                    success: false, 
                    message: `Note not found` 
                })
        }

        return res
            .status(statusCode.OK).json({ 
                success: true, 
                data: userResponse 
            })
    }).catch(err => console.log(err))
}

module.exports = {
    createUserResponse,
    updateUserResponse,
    deleteUserResponse,
    getUserResponseById,
    getUserResponse
}