const {Schema, model} = require('mongoose');

const {emailActionEnum} = require("../enums");

const ActionTokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },

    token: {
        type: String,
        required: true,
    },

    actionType: {
        type: String,
        enum: Object.values(emailActionEnum),
        required: true,
    },

}, {timestamps: true});

module.exports = model('action_token', ActionTokenSchema);
