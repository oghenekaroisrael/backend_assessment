const User = require('../models/User')
const validateUser = require('../models/User')
const ErrorResponse = require('../helpers/errorResponse')
const asyncHandler = require('../middlewares/asyncHandler')
const utils = require('../helpers/util')

exports.addUser = asyncHandler(async (req, res, next) => {
    const { providerId, whatsapp, email, firstName, middleName, lastName, address, phoneNumber, phoneNumber2 } = req.body;
    
    let {error}= validateUser(req.body);

    if (error) {
        next(new ErrorResponse(error.details[0].message, 404));
        return
    }

    const userExist = await User.findOne({ providerId: providerId, email: email });

    if (userExist) {
        userExist.firstName = firstName
        userExist.lastName = lastName
        userExist.middleName = middleName
        userExist.address = address
        userExist.phoneNumber = phoneNumber
        userExist.phoneNumber2 = phoneNumber2
        userExist.whatsapp = whatsapp
        userExist.email = email

        await userExist.save()
        
        res.status(200).json({
            message: "User has been changed",
            success: true,
        })
    } else {
    
        let newUser
    
        newUser = await User.create({
            firstName: firstName,
            lastName: lastName,
            middleName: middleName,
            address: address,
            phoneNumber: phoneNumber,
            phoneNumber2: phoneNumber2,
            whatsapp: whatsapp,
            email: email,
            providerId: providerId
        })

        return res.status(201).json({
            message: 'User Created Successfully',
            success: true
        })
    }
    
})

// endpoint to get all users for admin only
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


// Endpoint to delete user
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