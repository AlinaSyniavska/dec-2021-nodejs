const authRouter = require('express').Router();

const {authController} = require("../controllers");
const {authMiddleware} = require("../middlewares");

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

authRouter.post('/forgotPassword',
    authMiddleware.isEmailValid,
    authMiddleware.isUserPresentForAuth,
    authController.forgotPassword);

module.exports = authRouter;