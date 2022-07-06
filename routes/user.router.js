const userRouter = require('express').Router();

const {userController} = require("../controllers");
const {userMiddleware, commonMiddleware, authMiddleware, fileMiddleware} = require("../middlewares");

userRouter.get('/',
    userMiddleware.isUserQueryValid,
    userController.getAll);
userRouter.post('/',
    userMiddleware.isUserValidForCreate,
    fileMiddleware.checkUserAvatar,
    userMiddleware.isUserUniq,
    userController.create);

userRouter.get('/:id',
    commonMiddleware.isIdValid,
    userMiddleware.isUserPresent,
    userController.getById);
userRouter.put('/:id',
    commonMiddleware.isIdValid,
    authMiddleware.checkAccessToken,
    userMiddleware.isUserValidForUpdate,
    fileMiddleware.checkUserAvatar,
    userMiddleware.isUserPresent,
    userController.update);
userRouter.delete('/:id',
    commonMiddleware.isIdValid,
    authMiddleware.checkAccessToken,
    userMiddleware.isUserPresent,
    userController.delete);

module.exports = userRouter;
