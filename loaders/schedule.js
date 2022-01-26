const schedule = require("node-schedule");

//loader();
schedule.scheduleJob('0 */12 * * *', function () {
    loader()
});

function loader() {
    setTimeout(require('./leagues.loader'), 2000);
    setTimeout(require('./match.loader'), 5000);
}
