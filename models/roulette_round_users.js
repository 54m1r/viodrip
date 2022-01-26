module.exports = (sequelize, Sequelize) => {
    const RouletteRoundUser = sequelize.define("roulette_round_user", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        round_id: {
            type: Sequelize.STRING
        },
        user_id: {
            type: Sequelize.STRING
        },
        money: {
            type: Sequelize.INTEGER,
        },
        type: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    });

    return RouletteRoundUser;
};
