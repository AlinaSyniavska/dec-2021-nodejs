const {userService, passwordService} = require("../services");

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const users = await userService.findAll();
            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    create: async (req, res, next) => {
        try {
            const hashPassword = await passwordService.hashPassword(req.body.password);

            const newUser = await userService.createOne({...req.body, password: hashPassword});
            res.status(201).json(newUser);
        } catch (e) {
            next(e);
        }
    },

    getById: async (req, res, next) => {
        try {
            const {user} = req;
            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    update: async (req, res, next) => {
        try{
            const {id} = req.params;
            // const updatedUser = await userService.updateOne({_id: id}, req.body);
            const updatedUser = await userService.updateOne({_id: id}, req.dataForUpdate);
            res.status(201).json(updatedUser);
        } catch (e) {
            next(e);
        }
    },

    delete: async (req, res, next) => {
        try {
            const {id} = req.params;
            await userService.deleteOne({_id: id});
            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },
}
