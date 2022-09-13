const mongoose = require('mongoose');
const { uuid } = require('uuidv4');

const UserSchema = mongoose.Schema({
    userId: {
        type: Number,
        default: uuid(),
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    accountId: {
        type: Number,
        default: uuid(),
    },
},{ timestamps: true });

module.exports.validateUser = (body) => {
    var Joi = require('joi');
    const schema = Joi.object({
        userId: Joi.string(),
        firstName: Joi.string().max(25).required(),
        lastName: Joi.string().max(25).required(),
        accountId: Joi.types..
    });
    const result = schema.validate(body);
    return result;
}

module.exports = mongoose.model('User', UserSchema)