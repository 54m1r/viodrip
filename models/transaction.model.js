module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("transactions", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        money: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        status: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        },
        admin_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        proof: {
            type: Sequelize.STRING,
        },
        reason: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    });

    return Transaction;
};
