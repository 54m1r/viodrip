const controller = require("../controllers/bet.controller");
const passport = require('passport');

module.exports = function(app) {

    app.get(
        "/api/bets",
        controller.index
    );

    app.post(
        "/api/bets",
        passport.authenticate('jwt', {
            session: false
        }),
        controller.store
    );
};
