const mongoose = require('mongoose');
const { uuid } = require('uuidv4');

const UserSchema = mongoose.Schema({
    userId: {
        type: Number,
        default: uuid(),
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    accountId: {
        type: Number,
        default: uuid(),
    },
},{ timestamps: true });

module.exports.validateUser = (body) => {
    const schema = Joi.object({
        userId: Joi.string(),
        firstName: Joi.string().max(25),
        lastName: Joi.string().max(25),
        accountId: Joi.string()
    });
    const result = schema.validate(body);
    return result;
}

module.exports = mongoose.model('User', UserSchema)