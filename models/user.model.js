module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        username: {
            type: Sequelize.STRING,
            unique: true,
        },
        forum_id: {
            type: Sequelize.INTEGER,
            unique: true
        },
        password: {
            type: Sequelize.STRING
        },
        money: {
            type: Sequelize.INTEGER,
            defaultValue : 0,
            allowNull: false
        },
        avatar: {
            type: Sequelize.STRING,
            defaultValue : 'https://forum.vio-v.com/images/avatars/avatar-default.svg',
            allowNull: false
        },
        verify_code: {
            type: Sequelize.STRING
        },
        rank: {
            type: Sequelize.INTEGER,
            defaultValue : 0,
        },
        unlocked: {
            type: Sequelize.BOOLEAN,
            defaultValue : false,
            allowNull: false,
        },
    });

    return User;
};
