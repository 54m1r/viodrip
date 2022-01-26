module.exports = (sequelize, Sequelize) => {
    const League = sequelize.define("leagues", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        key: {
            type: Sequelize.STRING,
            unique: true
        },
        sport_id: {
            type: Sequelize.INTEGER,
        },
        active: {
            type: Sequelize.BOOLEAN,
            default: false
        },
    });

    return League;
};
