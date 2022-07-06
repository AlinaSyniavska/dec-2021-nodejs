module.exports = {
    userResponse: (user) => {
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            age: user.age,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }
    }
};

