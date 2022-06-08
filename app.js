const fs = require('fs/promises');
const path = require('path');

const reader = async (read) => {
    try {
        const files = await fs.readdir(read);

        console.log(files);

        for (const file of files) {
            const statistic = await fs.stat(path.join(read, file));

            if (statistic.isFile()) {
                await fs.rename(path.join(read, file), path.join(__dirname, 'exitFolder', file));
            }

            if (statistic.isDirectory()) {
                await reader(path.join(read, file));
            }
        }
    } catch (e) {
        console.log(e);
    }
}

reader(path.join(__dirname, 'folderForRead')).then();

