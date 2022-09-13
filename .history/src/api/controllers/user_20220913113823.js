const User = require('../models/User')
const validateUser = require('../models/User')
const ErrorResponse = require('../helpers/errorResponse')
const asyncHandler = require('../middlewares/asyncHandler')
const utils = require('../helpers/util')

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
    
    const { userId, firstName,lastName } = req.body

    try{
        let user = await User.findById({userId: userId});

        if (!user) {
            res.status(404).json({
                message: "User Not Found",
                success: false
            })
        }

        user.firstName = firstName
        user.lastName = lastName
        user.save()

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
    res.status(200).json(res.advancedResults)
})

// Method to get a user by Id
exports.getUser = asyncHandler(async (req, res, next) => {

    const userId = req.params.id;
    
    if (!userId) {
        next(new ErrorResponse(`credentials cannot be empty`, 404))
        return
    }

    try {
    
        const user = await User.findById({userId: userId});
        
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


// Method to delete user by Id 
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