const fs = require('fs/promises');
const path = require('path');

const dbPath = path.join(process.cwd(), 'dataBase', 'users.json');

module.exports = {
    reader: async () => {
        const data = await fs.readFile(dbPath);
        return data.toString()
            ? JSON.parse(data.toString()).sort((a, b) => a.id - b.id)
            : [];
    },

    writer: async (users) => {
        await fs.writeFile(dbPath, JSON.stringify(users));
    }
}
