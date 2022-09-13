const User = require('../models/User')
const validateUser = require('../models/User')
const ErrorResponse = require('../helpers/errorResponse')
const asyncHandler = require('../middlewares/asyncHandler')
const { ObjectId } = require('mongodb')
const { isUuid } = require('uuidv4')

// Method to add a user 
exports.addUser = asyncHandler(async (req, res, next) => {
    let {error}= validateUser(req.body);

    if (error) {
        next(new ErrorResponse(error.details[0].message, 404));
        return
    }
    
    const { userId, accountId, firstName,lastName } = req.body

    let newUser

    try{
        newUser = await User.create({
            userId: userId,
            firstName: firstName,
            lastName: lastName,
            accountId: accountId
        })

        return res.status(201).json({
            message: 'User Created Successfully',
            success: true
        })

    } catch (err) {
        return next(new ErrorResponse(err, 500))
    }
})

// Method to update a user's firstname and lastname
exports.updateUser = asyncHandler(async (req, res, next) => {
    let {error}= validateUser(req.body);

    if (error) {
        next(new ErrorResponse(error.details[0].message, 404));
        return
    }
    
    const { firstName,lastName, userId } = req.body
    
    if (!userId) {
        res.status(404).json({
            message: "User ID Not Found",
            success: false
        })
    }

    try{
        let user = await User.findOne({ userId });

        if (!user) {
            res.status(404).json({
                message: "User Not Found",
                success: false
            })
        }

        if (user) {
            user.firstName = firstName
            user.lastName = lastName
            user.save()
        }

        return res.status(201).json({
            message: 'User Updated Successfully',
            success: true
        })

    } catch (err) {
        return next(new ErrorResponse(err, 500))
    }
})

// Method  to get all users
exports.getUsers = asyncHandler(async (req, res, next) => {
    try {
    
        const user = await User.find({}, {_id: 0});
        
        if (!user) {
            res.status(404).json({
                message: "User Not Found",
                success: false
            })
        }

        res.status(200).json({
            success: true,
            data: user
        })

    } catch (err) {
        return next(new ErrorResponse(err, 500))
    }
})

// Method to get a user by Id
exports.getUser = asyncHandler(async (req, res, next) => {

    const { userId } = req.body;
    
    if (!userId) {
        next(new ErrorResponse(`credentials cannot be empty`, 404))
        return
    }

    try {
    
        const user = await User.findOne({userId: userId}, {_id: 0});
        
        if (!user) {
            res.status(404).json({
                message: "User Not Found",
                success: false
            })
        }

        res.status(200).json({
            success: true,
            data: user
        })

    } catch (err) {
        return next(new ErrorResponse(err, 500))
    }
    
})



exports.deleteUser = asyncHandler(async (req, res, next) => {

    const { userId } = req.body

    if (!userId) {
        next(new ErrorResponse(`credentials cannot be empty`, 404))
        return
    }

    try {

        const user = await User.findOne({userId: userId}, {_id: 0});
        
        if (!user) {
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