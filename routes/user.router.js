const userRouter = require('express').Router();

const {userController} = require("../controllers");

userRouter.get('/', userController.getAll);
userRouter.post('/', userController.create);
userRouter.get('/:userId', userController.getById);
userRouter.put('/:userId', userController.update);
userRouter.delete('/:userId', userController.delete);

module.exports = userRouter;