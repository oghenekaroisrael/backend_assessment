const mongoose = require('mongoose');
const MUUID = require('uuid-mongodb');


const UserSchema = mongoose.Schema({
    userId: {
        type: 'object',
        value: { type: 'Buffer' },
        default: () => MUUID.v4(),
        required: true,
        unique: true,
      },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    accountId: {
        type: 'object',
        value: { type: 'Buffer' },
        default: () => MUUID.v4(),
        required: true,
        unique: true,
      },
},{});

module.exports.validateUser = (body) => {
    const schema = Joi.object({
        userId: Joi.string().unique(true),
        firstName: Joi.string().max(25).required(),
        lastName: Joi.string().max(25).required(),
        accountId: Joi.string().unique(true)
    });
    const result = schema.validate(body);
    return result;
}

module.exports = mongoose.model('User', UserSchema)