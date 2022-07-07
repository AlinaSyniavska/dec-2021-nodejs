const dayjs = require('dayjs');

const {OAuth} = require("../dataBase");

module.exports = async () => {
    console.log('START DELETE OLD OAUTH TOKENS', new Date().toISOString())
    const oneMonthBeforeNow = dayjs().subtract(1, 'month');
    const sevenDaysBeforeNow = dayjs().subtract(7, 'days');

    const query = await OAuth.deleteMany({
        createdAt: {$lte: oneMonthBeforeNow}
    });

    console.log('______________');
    console.log(query);
    console.log('______________');
    console.log('FINISH DELETE OLD OAUTH TOKENS', new Date().toISOString())
};
