module.exports = (sequelize, Sequelize) => {
    const Match = sequelize.define("matches", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        team_0: {
            type: Sequelize.STRING
        },
        team_1: {
            type: Sequelize.STRING
        },
        start_date: {
            type: Sequelize.INTEGER,
        },
        odds_0: {
            type: Sequelize.DOUBLE,
        },
        odds_1: {
            type: Sequelize.DOUBLE,
        },
        odds_2: {
            type: Sequelize.DOUBLE,
        },
        scores_0: {
            type: Sequelize.INTEGER,
        },
        scores_1: {
            type: Sequelize.INTEGER,
        },
        league_id: {
            type: Sequelize.INTEGER,
        },
    });

    return Match;
};
