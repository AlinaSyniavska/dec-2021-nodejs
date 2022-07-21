const bcrypt = require('bcrypt');
const {CustomError} = require("../errors");

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),
    comparePassword: async (hashPassword,  password) => {
        const isPasswordsSame = await bcrypt.compare(password, hashPassword);

        if(!isPasswordsSame) {
            throw new CustomError('Wrong email or password');
        }
    },
}
