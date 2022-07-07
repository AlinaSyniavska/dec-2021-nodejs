const {userService, passwordService, emailService} = require("../services");
const {userPresenter} = require("../presenters");
const {emailActionEnum} = require("../enums");

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const users = await userService.findAll(req.query).exec();
            const usersForResponse = users.map(user => userPresenter.userResponse(user));
            res.json(usersForResponse);
        } catch (e) {
            next(e);
        }
    },

    create: async (req, res, next) => {
        try {
            const {email, password, name} = req.body;

            const hashPassword = await passwordService.hashPassword(password);
            const newUser = await userService.createOne({...req.body, password: hashPassword});

            const userForResponse = userPresenter.userResponse(newUser);

            await Promise.allSettled([
                emailService.sendMailHbs(email, emailActionEnum.WELCOME, {name})
            ]);

            res.status(201).json(userForResponse);
        } catch (e) {
            next(e);
        }
    },

    getById: async (req, res, next) => {
        try {
            const {user} = req;
            const userForResponse = userPresenter.userResponse(user);
            res.json(userForResponse);
        } catch (e) {
            next(e);
        }
    },

    update: async (req, res, next) => {
        try {
            const {id} = req.params;
            const updatedUser = await userService.updateOne({_id: id}, req.body);
            const userForResponse = userPresenter.userResponse(updatedUser);
            res.status(201).json(userForResponse);
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
};
