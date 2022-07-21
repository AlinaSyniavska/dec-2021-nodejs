const {User} = require("../dataBase");

module.exports = {
    findAll: (params = {}) => {
        return User.find(params);
    },

    findAllWithPagination: async (query = {}) => {
        const {page = 1, perPage = 5, ...otherFilters} = query;
        const skip = (page - 1) * perPage;

        console.log(otherFilters);  // search, ageGte, ageLte, ...

        const queryFilters = _getUserFilterQuery(otherFilters);

        const users = await User.find(queryFilters).skip(skip).limit(perPage);
        const usersCount = await User.countDocuments(queryFilters);

        return {
            page,
            perPage,
            data: users,
            count: usersCount,
        }
    },

    findOne: (params = {}) => {
        return User.findOne(params);
    },

    createOne: (user) => {
        return User.create(user);
        // return User.createUserWithHashPassword(user); //UserSchema.statics
    },

    updateOne: (params = {}, userData, options = {new: true}) => {
        return User.findOneAndUpdate(params, userData, options);
    },

    deleteOne: (params = {}) => {
        return User.deleteOne(params);
    },
}

function _getUserFilterQuery(filters) {
    const searchObject = {};    // prepared mongo queries

    if (filters.search) {
        Object.assign(searchObject, {
            $or: [
                { name: { $regex: filters.search, $options: 'i' }},
                { email: { $regex: filters.search, $options: 'i' }}
            ]
        })
    }

    if (filters.ageGte) {
        Object.assign(searchObject, {
            age: {$gte: filters.ageGte}
        })
    }

    if (filters.ageLte) {
        Object.assign(searchObject, {
            age: {
                ...searchObject.age || {},
                $lte: filters.ageLte
            }
        })
    }

    console.log(JSON.stringify(searchObject, null, 2));

    return searchObject;
}
