const authRouter = require('express').Router();

const {authController} = require("../controllers");
const {userMiddleware} = require("../middlewares");

authRouter.post('/login', userMiddleware.isUserLoginPresent, authController.login);

module.exports = authRouter;