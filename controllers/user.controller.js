const {User} = require('../dataBase');
const {CustomError} = require("../error");

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    create: async (req, res, next) => {
        try {
            const newUser = await User.create(req.body);
            res.status(201).json(newUser);
        } catch (e) {
            next(e);
        }
    },

    getById: async (req, res, next) => {
        try {
            const {userId = ''} = req.params;

            // const user = await User.findById(userId);
            const user = await User.findOne({_id: userId});

            if (!user) {
                throw new CustomError(`User with id ${userId} not found`, 404);
            }

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    update: async (req, res, next) => {
        /*        try {
                    const {name, age} = req.body;
                    const {userId} = req.params;

                    if (age && !Number.isInteger(age) || age < 15) {
                        return res.status(400).json('Set valid age');
                    }

                    if (name && name.length < 3) {
                        return res.status(400).json('Set valid name');
                    }

                    const users = await fileService.reader();

                    const index = users.findIndex((user) => user.id === +userId);

                    if (userId === -1) {
                        res.status(404).json(`User with ${userId} not found`);
                    }

                    // const updatedUser = {...users[index], ...req.body};
                    const updatedUser = Object.assign(users[index], req.body);

                    users.splice(index, 1)

                    await fileService.writer([...users, updatedUser]);
                    res.status(201).json(updatedUser);
                } catch (e) {
            res.status(400).json({error: e.message || 'Unknown Error'});
                }*/
    },

    delete: async (req, res, next) => {
        try {
            const {userId = ''} = req.params;

            // await User.findOneAndDelete(userId);
            await User.deleteOne({_id: userId});

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },
}
