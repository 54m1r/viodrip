const controller = require("../controllers/admin.controller");
const passport = require('passport');

module.exports = function(app) {

    app.get(
        "/api/admin/bets",
        controller.index
    );
    
};
