const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sport = require("../models/sport.model.js")(sequelize, Sequelize);
db.league = require("../models/league.model.js")(sequelize, Sequelize);
db.match = require("../models/match.model.js")(sequelize, Sequelize);

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.betting_slip = require("../models/betting_slip.model.js")(sequelize, Sequelize);
db.transaction = require("../models/transaction.model")(sequelize, Sequelize);

db.roulette_round = require("../models/roulette_round.model.js")(sequelize, Sequelize);
db.roulette_round_user = require("../models/roulette_round_users.js")(sequelize, Sequelize);

db.sport.hasMany(db.league, { foreignKey: 'sport_id', as: 'leagues' });
db.league.hasMany(db.match, { foreignKey: 'league_id', as: 'matches' });

db.user.hasMany(db.betting_slip, { foreignKey: 'user_id', as: 'bettingSlips' });
db.betting_slip.belongsTo(db.match, { foreignKey: 'match_id', as: 'match' });
db.betting_slip.belongsTo(db.user, { foreignKey: 'user_id', as: 'user' });

db.match.hasMany(db.betting_slip, { foreignKey: 'match_id', as: 'bettingSlips' });

module.exports = db;
