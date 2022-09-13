const mongoose = require('mongoose');
const uuid = require('uuid').v4();
var Schema = mongoose.Schema;

// Will add the UUID type to the Mongoose Schema types
require('mongoose-uuid2')(mongoose);
const UUID = mongoose.Types.UUID;

const UserSchema = Schema({
    userId: {
        type: UUID,
        default: uuid,
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    accountId: {
        type: UUID,
        default: uuid,
    },
});

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