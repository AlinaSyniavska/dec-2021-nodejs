/*
const fs = require('fs');
const path = require('path');

const sortFolder = (read, gender, write) => {
    fs.readdir(path.join(__dirname, read), (err, files) => {
        if (err) return console.log(err);

        files.forEach((file) => {
            const readFolderPath = path.join(__dirname, read, file);
            fs.readFile(readFolderPath, (err1, files1) => {
                if (err1) return console.log(err1);

                const user = JSON.parse(files1.toString());

                if (user.gender === gender) {
                    fs.rename(readFolderPath, path.join(__dirname, write, file), (err2) => {
                        err2 && console.log(err2);
                    });
                }
            });
        })
    });
}

sortFolder('boys', 'female', 'girls');
sortFolder('girls', 'male', 'boys');
*/

const fs = require('fs/promises');
const path = require('path');

const sortFolder = async (read, gender, write) => {
    try {
        const files = await fs.readdir(path.join(__dirname, read));

        for (const file of files) {
            const readFolderPath = path.join(__dirname, read, file);
            const data = await fs.readFile(readFolderPath);

            const user = JSON.parse(data.toString());

            if (user.gender === gender) {
                await fs.rename(readFolderPath, path.join(__dirname, write, file));
            }
        }
    } catch (e) {
        console.log(e);
    }

}

sortFolder('boys', 'female', 'girls');
sortFolder('girls', 'male', 'boys');
