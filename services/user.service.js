const {User} = require("../dataBase");

module.exports = {
    findAll: (params = {}) => {
        return User.find(params);
    },

    findOne: (params = {}) => {
        return User.findOne(params);
    },

    createOne: (user) => {
        return User.create(user);
    },

    updateOne: (params = {}, userData, options = {new: true}) => {
        return User.findOneAndUpdate(params, userData, options);
    },

    deleteOne: (params = {}) => {
        return User.deleteOne(params);
    },

    addFieldToAll: (fieldData, params={}) => {
        const skillsList = fieldData.split(';');
        return User.updateMany(params, {$set: {skills: skillsList}});
    },

    addOneSkills: (fieldData, params={}) => {
        const skillsList = fieldData.split(';');
        return User.updateOne(params, {$addToSet: {skills: skillsList}});
    },
}
