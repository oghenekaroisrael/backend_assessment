const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    userId: {
        type: Number,
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
        required: [true, 'No Account Supplied']
    },
},{ timestamps: true });

module.exports.validateUser = (body) => {
    const schema = Joi.object({
        userId: Joi.number().required().min(0),
        firstName: Joi.string().max(25),
        lastName: Joi.string().max(25),
        accountId: Joi.number().required().min(0)
    });
    const result = schema.validate(body);
    return result;
}

module.exports = mongoose.model('User', UserSchema)