const controller = require("../controllers/auth.controller");
const passport = require('passport');

module.exports = function(app) {

    app.post(
        "/api/auth/register",
        controller.register
    );

    app.post(
        "/api/auth/login",
        controller.login
    );

    app.get(
        "/api/profile",
        passport.authenticate('jwt', {
            session: false
        }),
        controller.profile,
    );
};
