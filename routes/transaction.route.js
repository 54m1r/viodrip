const controller = require("../controllers/transaction.controller");
const passport = require('passport');

module.exports = function(app) {

    app.get(
        "/api/admins/payin",
        controller.payin_admins
    );


    app.get(
        "/api/admins/payout",
        controller.payout_admins
    );

    app.post(
        "/api/transactions/charge",
        passport.authenticate('jwt', {
            session: false
        }),
        controller.charge
    );
};
