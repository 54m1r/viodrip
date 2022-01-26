module.exports = (sequelize, Sequelize) => {
    const Sport = sequelize.define("sports", {
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
        active: {
            type: Sequelize.BOOLEAN,
            default: false
        },
    });

    return Sport;
};
