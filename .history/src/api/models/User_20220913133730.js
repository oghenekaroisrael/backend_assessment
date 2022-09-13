const mongoose = require('mongoose');
const uuid = require('uuid');
const validator = require('validator');

var Schema = mongoose.Schema;

const UserSchema = Schema({
    userId: {
        type: 'object',
        value: { type: 'Buffer' },
        default: () => MUUID.v4(),
  
        required: true,
        unique: true,
        index: true,
      },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    accountId: {
        type: String,
        default: () => uuid.v4(),
    },
},{ timestamps: true });

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