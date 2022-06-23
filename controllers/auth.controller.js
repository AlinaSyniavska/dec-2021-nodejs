const {tokenService, passwordService} = require("../services");
const {userPresenter} = require("../presenters");
const {OAuth} = require("../dataBase");

module.exports = {
    login: async (req, res, next) => {
        try {
            const {password: hashPassword, _id} = req.user;
            const {password} = req.body;

            await passwordService.comparePassword(hashPassword, password);

            const tokens = tokenService.generateAuthTokens();

            const userForResponse = userPresenter.userResponse(req.user);

            await OAuth.create({
               userId: _id,
               ...tokens
            });

            res.json({
                user: userForResponse,
                ...tokens
            });
        } catch (e) {
            next(e);
        }
    },
};
