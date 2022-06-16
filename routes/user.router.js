const userRouter = require('express').Router();

const {userController} = require("../controllers");
const {userMiddleware} = require("../middlewares");

userRouter.get('/', userController.getAll);
userRouter.post('/', userMiddleware.checkUserToCreate, userController.create);
userRouter.get('/:userId', userMiddleware.checkUserId, userController.getById);
userRouter.put('/:userId', userController.update);
userRouter.delete('/:userId', userMiddleware.checkUserId, userController.delete);

module.exports = userRouter;
