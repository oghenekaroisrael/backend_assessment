const mongoose = require('mongoose');
const uuid = require('uuid');
const validator = require('validator');

var Schema = mongoose.Schema;
function guidPlugin (schema, options) {
    options = options || {};

    var pk = schema.add({
      _id: {
        type: 'string',
        default: () => uuid.v4(),
        trim: true,
        lowercase: true
      }
    });

    schema.path('_id').validate(function(v){
        return validator.isUUID(v);
    }, 'ID is not a valid GUID: {VALUE}');
};

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