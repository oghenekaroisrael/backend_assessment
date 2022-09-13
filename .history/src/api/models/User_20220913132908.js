const mongoose = require('mongoose');
const uuid = require('uuid');
// const UUID = require('mongoose-uuid2').UUID;
var Schema = mongoose.Schema;
// require('mongoose-uuid2')(mongoose);
// var UUID = mongoose.Types.UUID

const UserSchema = Schema({
    userId: {
        type: String,
        default: () => uuid.v4(),
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