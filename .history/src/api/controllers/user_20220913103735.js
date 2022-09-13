const Owner = require('../models/Owner')
const validateOwner = require('../models/Owner')
const ErrorResponse = require('../helpers/errorResponse')
const asyncHandler = require('../middlewares/asyncHandler')
const utils = require('../helpers/util')

exports.addOwner = asyncHandler(async (req, res, next) => {
    const { providerId, whatsapp, email, firstName, middleName, lastName, address, phoneNumber, phoneNumber2 } = req.body;
    
    let {error}= validateOwner(req.body);

    if (error) {
        next(new ErrorResponse(error.details[0].message, 404));
        return
    }

    const ownerExist = await Owner.findOne({ providerId: providerId, email: email });

    if (ownerExist) {
        ownerExist.firstName = firstName
        ownerExist.lastName = lastName
        ownerExist.middleName = middleName
        ownerExist.address = address
        ownerExist.phoneNumber = phoneNumber
        ownerExist.phoneNumber2 = phoneNumber2
        ownerExist.whatsapp = whatsapp
        ownerExist.email = email

        await ownerExist.save()
        
        res.status(200).json({
            message: "Owner has been changed",
            success: true,
        })
    } else {
    
        let newOwner
    
        newOwner = await Owner.create({
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
            message: 'Owner Created Successfully',
            success: true
        })
    }
    
})

// endpoint to get all owners for admin only
exports.getOwners = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults)
})

// endpoint to get an owner
exports.getOwner = asyncHandler(async (req, res, next) => {

    try {
        let {profile, error} = await utils.getProviderProfile(req);
    
        if (error){
            next(new ErrorResponse('Provider Not Found', 404));
            return
        }
    
        const owner = await Owner.findOne({providerId: profile.id});
    
        if (owner){
            res.status(200).json({
                success: true,
                data: owner
            })
        }
    } catch (err) {
        return next(new ErrorResponse(err, 500))
    }
    
})
