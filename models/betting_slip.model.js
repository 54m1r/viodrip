module.exports = (sequelize, Sequelize) => {
    const BettingSlip = sequelize.define("betting_slips", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        match_id: {
            type: Sequelize.INTEGER,
        },
        user_id: {
            type: Sequelize.INTEGER,
        },
        type: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        money: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        odd: {
            type: Sequelize.DOUBLE,
            allowNull: false,
        },
        //TODO finished
    });

    return BettingSlip;
};
