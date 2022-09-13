const User = require('../models/User')
const validateUser = require('../models/User')
const ErrorResponse = require('../helpers/errorResponse')
const asyncHandler = require('../middlewares/asyncHandler')
const utils = require('../helpers/util')

exports.addState = asyncHandler(async (req, res, next) => {
    let {error}= validateUser(req.body);

    if (error) {
        next(new ErrorResponse(error.details[0].message, 404));
        return
    }
    
    const { userName, countryId } = req.body

    if (!userName || !countryId) {
        next(new ErrorResponse(`Credential cannot be empty`, 404))
        return
    }

    let newState

    const userExist = await State.findOne({ userName: userName })

    if (userExist) {
        next(new ErrorResponse(`State Exists`, 300))
        return
    }
    newState = await State.create({
        userName: userName,
        countryId: countryId
    })

    return res.status(201).json({
        message: 'User Created Successfully',
        success: true
    })
})

// endpoint to get all users
exports.getUsers = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults)
})

// endpoint to get an user
exports.getUser = asyncHandler(async (req, res, next) => {

    const userId = req.params.id;
    
    if (!userId) {
        next(new ErrorResponse(`credentials cannot be empty`, 404))
        return
    }

    try {
    
        const user = await User.findById({userId: userId});
    
        if (user){
            res.status(200).json({
                success: true,
                data: user
            })
        }
    } catch (err) {
        return next(new ErrorResponse(err, 500))
    }
    
})


// Method to delete user by id 
exports.deleteUser = asyncHandler(async (req, res, next) => {

    const userId = req.params.id

    if (!userId) {
        next(new ErrorResponse(`credentials cannot be empty`, 404))
        return
    }

    try {

        let userExists = await User.find({ userId: userId });

        if (!userExists[0]) {

            res.status(404).json({
                message: "User Not Found",
                success: false
            })
        }

        await User.deleteOne({ userId: userId });

        res.status(200).json({
            message: "User Deleted Successfully",
            success: true,
        })

    } catch (err) {
        return next(new ErrorResponse(err, 500))
    }
})