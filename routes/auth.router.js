const authRouter = require('express').Router();

const {authController} = require("../controllers");
const {authMiddleware} = require("../middlewares");
const {emailActionEnum} = require("../enums");

authRouter.post('/login',
    authMiddleware.isLoginBodyValid,
    authMiddleware.isUserPresentForAuth,
    authController.login);

authRouter.post('/refreshToken',
    authMiddleware.checkRefreshToken,
    authController.refreshToken);

authRouter.post('/logout',
    authMiddleware.checkAccessToken,
    authController.logout);

authRouter.post('/logoutAllDevices',
    authMiddleware.checkAccessToken,
    authController.logoutAllDevices);

authRouter.post('/password/forgot',
    authMiddleware.isEmailValid,
    authMiddleware.isUserPresentForAuth,
    authController.forgotPassword);

authRouter.post('/password/forgot/set',
    authMiddleware.checkActionToken(emailActionEnum.FORGOT_PASSWORD),
    authController.setForgotPassword);

module.exports = authRouter;