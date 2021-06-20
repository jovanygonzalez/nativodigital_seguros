"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import Sequelize from "sequelize";
const Sequelize = require('sequelize');
const keys_1 = __importDefault(require("./keys"));
exports.sequelize = new Sequelize(keys_1.default.database.database, keys_1.default.database.user, keys_1.default.database.password, {
    host: keys_1.default.database.host,
    dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: false
});
//# sourceMappingURL=database.js.map