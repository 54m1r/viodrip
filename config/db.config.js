module.exports = {
    HOST: "db",
    USER: "root",
    PASSWORD: "CHANGE_ME!!!",
    DB: "casino",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
