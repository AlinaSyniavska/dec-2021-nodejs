const {Schema, model} = require('mongoose');
const {passwordService} = require("../services");

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true
    },

    phone: {
        type: String,
        trim: true
    },

    age: {
        type: Number,
        default: 20
    },

    password: {
        type: String,
        required: true,

    }
}, {timestamps: true});

UserSchema.methods = { // for single record // THIS - RECORD
    async comparePasswords(password) {
        await passwordService.comparePassword(this.password, password);
    }
}

UserSchema.statics = { // for schema // THIS - SCHEMA
    createUserWithHashPassword: async function(userToSave) {
        const hashPassword = await passwordService.hashPassword(userToSave.password);

        return this.create({...userToSave, password: hashPassword});
    }
}

module.exports = model('user', UserSchema);

