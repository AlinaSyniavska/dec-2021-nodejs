const userRouter = require('express').Router();

const {userController} = require("../controllers");
const {userMiddleware, commonMiddleware} = require("../middlewares");

userRouter.get('/',
    userController.getAll);
userRouter.post('/',
    userMiddleware.isUserValidForCreate,
    userMiddleware.isUserUniq,
    userController.create);

userRouter.get('/:id',
    commonMiddleware.isIdValid,
    userMiddleware.isUserPresent,
    userController.getById);
userRouter.put('/:id',
    commonMiddleware.isIdValid,
    userMiddleware.isUserValidForUpdate,
    userMiddleware.isUserPresent,
    userController.update);
userRouter.delete('/:id',
    commonMiddleware.isIdValid,
    userMiddleware.isUserPresent,
    userController.delete);

module.exports = userRouter;
