module.exports = {
    userResponse: (user) => {
        return {
            _id: user._id,
            name: user.name,
            email: user.email,
            age: user.age,
            phone: user.phone,
            avatar: user.avatar,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }
    }
};

