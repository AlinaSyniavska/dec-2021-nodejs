const {fileService} = require("../services");

module.exports = {
    getAll: async (req, res) => {
        try {
            const users = await fileService.reader();

            res.json(users);
        } catch (e) {
            res.status(400).json(e.message || 'UnknownError')
        }
    },

    create: async (req, res) => {
        try {
            const {name, age} = req.body;

            if (!Number.isInteger(age) || age < 15) {
                return res.status(400).json('Set valid age');
            }

            if (!name || name.length < 3) {
                return res.status(400).json('Set valid name');
            }

            const users = await fileService.reader();

            const newUser = {...req.body, id: users.length ? users[users.length - 1].id + 1 : 1};
            // console.log(newUser)

            await fileService.writer([...users, newUser]);
            res.status(201).json(newUser);
        } catch (e) {
            res.status(400).json(e.message || 'UnknownError')
        }
    },

    getById: async (req, res) => {
        try {
            const {userId} = req.params;

            const users = await fileService.reader();

            const user = users.find((user) => user.id === +userId);

            if (!user) {
                return res.status(404).json(`User with id ${userId} not found`);
            }

            res.json(user);
        } catch (e) {
            res.status(400).json(e.message || 'UnknownError')
        }
    },

    update: async (req, res) => {
        try {
            const {name, age} = req.body;
            const {userId} = req.params;

            if (age && !Number.isInteger(age) || age < 15) {
                return res.status(400).json('Set valid age');
            }

            if (name && name.length < 3) {
                return res.status(400).json('Set valid name');
            }

            const users = await fileService.reader();

            const index = users.findIndex((user) => user.id === +userId);

            if (userId === -1) {
                res.status(404).json(`User with ${userId} not found`);
            }

            // const updatedUser = {...users[index], ...req.body};
            const updatedUser = Object.assign(users[index], req.body);

            users.splice(index, 1)

            await fileService.writer([...users, updatedUser]);
            res.status(201).json(updatedUser);
        } catch (e) {
            res.status(400).json(e.message || 'UnknownError')
        }
    },

    delete: async (req, res) => {
        try {
            const {userId} = req.params;

            const users = await fileService.reader();

            const index = users.findIndex((user) => user.id === +userId);

            if (index === -1) {
                return res.status(404).json(`User with id ${userId} not found`);
            }

            users.splice(index, 1);

            await fileService.writer(users);

            res.sendStatus(204);
        } catch (e) {
            res.status(400).json(e.message || 'UnknownError')
        }
    },
}