const {userService, passwordService, emailService, smsService, s3Service} = require("../services");
const {userPresenter} = require("../presenters");
const {emailActionEnum, smsActionEnum} = require("../enums");
const {smsTemplateBuilder} = require("../common");
const {User} = require("../dataBase");

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
            const {email, password, name, phone} = req.body;

            const hashPassword = await passwordService.hashPassword(password);
            const newUser = await userService.createOne({...req.body, password: hashPassword});
            // const newUser = await userService.createOne(req.body);

            const {Location} = await s3Service.uploadFile(req.files.avatar, 'user', newUser._id);

            const userWithPhoto = await User.findByIdAndUpdate(newUser._id, {avatar: Location}, {new: true});

            const userForResponse = userPresenter.userResponse(userWithPhoto);
            // const userForResponse = userPresenter.userResponse(newUser);

            // comment for debug
            // const sms = smsTemplateBuilder[smsActionEnum.WELCOME](name);
            // await smsService.sendSMS(phone, sms);
            // await emailService.sendMailHbs(email, emailActionEnum.WELCOME, {name});

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

            if (req.files?.avatar) {
                if (req.user?.avatar) {
                    const {Location} = await s3Service.uploadFile(req.files.avatar, 'user', id);
                    req.body.avatar = Location;
                } else {
                    const {Location} = await s3Service.updateFile(req.files.avatar, req.user.avatar);
                    req.body.avatar = Location;
                }
            }

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

            if (req.user.avatar) {
                await s3Service.deleteFile(req.user.avatar);
            }

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },
};
