const controller = require("../games/roulette");
const passport = require('passport');

module.exports = function(app) {

    app.post(
        "/api/roulette/bet",
        passport.authenticate('jwt', {
            session: false
        }),
        controller.store
    );
};
