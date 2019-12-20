const User = require('../models/user-model')
const _ = require('lodash')
const statusCode = require('http-status-codes');

userSave = (user) => {
    return user.save()
}

userSaveReturn = (res, user, message, statusCode) => {
    return res.status(statusCode).json({
        success: true,
        id: user._id,
        message: message,
    })
}

createUser = (req, res) => {
    const body = req.body

    if(!body || _.isEmpty(body) || !req.hasOwnProperty('body')){
        return res.status(statusCode.BAD_REQUEST).json({
            success: false,
            error: 'You must provide Sign-In Information',
        })
    }

    const user = new User(body)

    if(!user){
        return res.status(statusCode.NOT_FOUND).json({
            success: false,
            error: err
        })
    }       
        
    User.findOne({username: req.body.username}, (err, user_) => {
        if(err) {
            return res.status(statusCode.BAD_REQUEST).json({
                success: false,
                error: err
            })
        }
        
        if(user_) {
            return res.json({
                success: false,
                error: "user exists"
            });

        } else {
            userSave(user)
            return res.status(statusCode.OK).json({
                success: true,
                data: user,
            })
        }

    })
}

updateUser = (req, res) => {
    const body = req.body

    if(!body || _.isEmpty(body) || !req.hasOwnProperty('body')){
        return res.status(statusCode.BAD_REQUEST).json({
            success: false,
            error: 'You must provide a body to'
        })
    }

    User.findOne({_id: req.params.id}, (err,user) => {
        if(err) {
            return res.status(statusCode.NOT_FOUND).json({
                success: false,
                error: err,
            })
        }

        if(body.username !== undefined)
            user.username = body.username
        else
            user.username = user.username
        
        if(body.email !== undefined)
            user.email = body.email
        else   
            user.email = user.email
        
        if(body.bio !== undefined)
            user.bio = body.bio
        else
            user.bio = user.bio

        if(body.image !== undefined)
            user.image = body.image
        else
            user.image = user.image
        
        if(body.status !== undefined)
            user.status = body.status
        else
            user.status = user.status

        try {
            userSave(user)
            return res.status(statusCode.OK).json({
                success: true,
                data: user,
            })
        } catch (error) {
            return res.status(statusCode.NOT_FOUND).json({
                success: false,
                error: error,
            })
        }
    })
}

deleteUser = async(req,res) => {
    await User.findOneAndDelete({ _id: req.params.id }, (err,user) => {
            if(err){
                return res.status(statusCode.BAD_REQUEST)
                    .json({
                        success: false,
                        message: err
                    })
            }

            if(!user){
                return res
                    .status(statusCode.NOT_FOUND)
                    .json({
                        success: false,
                        message: 'User not found'
                    })
            }

            return res
                .status(statusCode.OK)
                .json({
                    success: true,
                    data: user
                })
        }
    ).catch(err => console.log(err))
}

getUserById = async (req,res) => {
    await User.findOne({ _id: req.params.id }, (err, user) => {
        if(err){
            return res.status(statusCode.BAD_REQUEST)
                .json({
                    success: false,
                    error: err
                })
        }

        if(!user){
            return res
                .status(statusCode.NOT_FOUND)
                .json({
                    success: false,
                    error: 'User not found'
                })
        }

        return res
            .status(statusCode.OK)
            .json({
                success: true,
                data: user
            })
    }).catch(err => console.log(err))
}

userSignIn = async (req, res) => {
    const body = req.body

    if(!body.username && 
        !body.password){
        return res.status(statusCode.BAD_REQUEST).json({
            success: false,
            error: 'You must provide a username or/and password'
        })
    }

    User.findOne({username: body.username}, (err, _user) => {
        if(err) {
            return res.status(statusCode.NOT_FOUND).json({
                success: false,
                error: err,
            })
        }
        
        if(!_user){
            return res
                .status(statusCode.NOT_FOUND)
                .json({
                    success: false,
                    error: 'User not found'
                })
        } else {
            User.findOne({password: body.password}, (_err,_user_) => {
                if(_err) {
                    return res.status(statusCode.NOT_FOUND).json({
                        success: false,
                        error: _err,
                    })
                }

                if(!_user_){
                    return res
                        .status(statusCode.NOT_FOUND)
                        .json({
                            success: false,
                            error: 'User not found'
                        })
                }
                
                if(_user_.status == "1"){
                    return res
                        .status(statusCode.NOT_FOUND)
                        .json({
                            success: false,
                            error: 'User is already Logged-In'
                        })
                }

                _user_.status = "1"
        
                try {
                    userSave(_user_)

                    return res
                        .status(statusCode.OK)
                        .json({
                            success: true,
                            data: _user_
                        })
                } catch (error) {
                    return res.status(statusCode.BAD_REQUEST).json({
                        success: false,
                        error: error
                    })
                }
            })
        }
    })
}

userSignOut = async (req, res) => {
    const body = req.body

    if(!body.username && 
        !body.password){
        return res.status(statusCode.BAD_REQUEST).json({
            success: false,
            error: 'You must provide a username or/and password'
        })
    }

    User.findOne({username: body.username}, (err, _user) => {
        if(err) {
            return res.status(statusCode.NOT_FOUND).json({
                success: false,
                error: err,
            })
        }
        
        if(!_user){
            return res
                .status(statusCode.NOT_FOUND)
                .json({
                    success: false,
                    error: 'User not found'
                })
        } else {
            User.findOne({password: body.password}, (_err,_user_) => {
                if(_err) {
                    return res.status(statusCode.NOT_FOUND).json({
                        success: false,
                        error: _err,
                    })
                }

                if(!_user_){
                    return res
                        .status(statusCode.NOT_FOUND)
                        .json({
                            success: false,
                            error: 'User not found'
                        })
                }
                
                if(_user_.status == "0"){
                    return res
                        .status(statusCode.BAD_REQUEST)
                        .json({
                            success: false,
                            error: 'User is not Logged-In'
                        })
                }

                _user_.status = "0"
        
                try {
                    userSave(_user_)
                    return res
                        .status(statusCode.OK)
                        .json({
                            success: true,
                            data: _user_
                        })
                } catch (error) {
                    return res.status(statusCode.BAD_REQUEST).json({
                        success: false,
                        error: error
                    })
                }
            })
        }
    })
}

module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    userSignIn,
    userSignOut
}