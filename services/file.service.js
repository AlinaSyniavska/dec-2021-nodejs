const fs = require('fs/promises');
const path = require('path');
const { open } = require('node:fs/promises');


module.exports = {
    append: async (path, data) => {
        try {
            await fs.appendFile(path, data)
        } catch (e) {
            console.log(e);
        }
    },

    readDir: async (path) => {
        try {
            const files = await fs.readdir(path);

            for (const file of files) {
                console.log(file);

                const data = await fs.readFile(`${path}/${file}`);
                console.log(data);
                console.log(data.toString());
            }
        } catch (e) {
            console.log(e);
        }
    },

    readDataStream: async (path) => {
        try {
            const fd = await open(path);
            const readStream = fd.createReadStream();

            readStream.on('data', (chunk) => {
                console.log('chunk');
                console.log(chunk);
            });

            readStream.on('end', () => {
                console.log('File DONE!');
            })
        } catch (e) {
            console.error('ERROR READ_DATA_STREAM');
            console.log(e);
        }
    },
}
