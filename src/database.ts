// import Sequelize from "sequelize";
const Sequelize = require('sequelize')
import keys from "./keys"
import { filter, map } from "bluebird";

export const sequelize = new Sequelize(keys.database.database, keys.database.user, keys.database.password, {
    host: keys.database.host,
    dialect: 'mysql'/* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      logging:false
  });