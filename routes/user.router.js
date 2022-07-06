const userRouter = require('express').Router();

const {userController} = require("../controllers");
const {userMiddleware, commonMiddleware, authMiddleware} = require("../middlewares");
const {userValidator, userQueryValidator} = require("../validators");

userRouter.get('/',
    commonMiddleware.isDataValid(userQueryValidator.allUsersValidator, 'query'),// userMiddleware.isUserQueryValid,
    userController.getAll);
userRouter.post('/',
    commonMiddleware.isDataValid(userValidator.newUserValidator), // userMiddleware.isUserValidForCreate,
    userMiddleware.isUserUniq,
    userController.create);

userRouter.get('/:id',
    commonMiddleware.isIdValid,
    userMiddleware.isUserPresent,
    userController.getById);
userRouter.put('/:id',
    commonMiddleware.isIdValid,
    authMiddleware.checkAccessToken,
    commonMiddleware.isDataValid(userValidator.updateUserValidator),// userMiddleware.isUserValidForUpdate,
    userMiddleware.isUserPresent,
    userController.update);
userRouter.delete('/:id',
    commonMiddleware.isIdValid,
    authMiddleware.checkAccessToken,
    userMiddleware.isUserPresent,
    userController.delete);

module.exports = userRouter;
