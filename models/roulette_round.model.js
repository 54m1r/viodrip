module.exports = (sequelize, Sequelize) => {
    const RouletteRound = sequelize.define("roulette_rounds", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        result: {
            type: Sequelize.INTEGER
        },
        salt: {
            type: Sequelize.STRING
        },
        hash: {
            type: Sequelize.STRING,
        },
    });

    return RouletteRound;
};
