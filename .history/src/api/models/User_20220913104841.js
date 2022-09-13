const mongoose = require('mongoose');

const OwnerSchema = mongoose.Schema({
    userId: {
        type: Number,
        required: [true, 'No Provider Indicated']
    },
    firstName: {
        type: String,
        default: '',
        required: false
    },
    lastName: {
        type: String,
        default: '',
        required: false
    },
    accountId: {
        type: Number,
        required: [true, 'No Provider Indicated']
    },
},{ timestamps: true });

module.exports.validateOwner = (body) => {
    const schema = Joi.object({
        userId: Joi.number().required().min(0),
        firstName: Joi.string().max(25),
        lastName: Joi.string().max(25),
        accountId: Joi.number().required().min(0)
    });
    const result = schema.validate(body);
    return result;
}

module.exports = mongoose.model('Owner', OwnerSchema)



 "userId": "a38a8320-b750-41d1-a2d3-117dd286eeb5", //guid
 "firstName": "John", //string
 "lastName": "Doe",//string
 "accountId": "47cabec9-4e05-4744-b1c3-602a51dd86bc"//guid