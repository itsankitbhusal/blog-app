// make database connection here to user in other models
// and export connection

import "dotenv/config"
import { Sequelize } from "sequelize";

export default new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: "mysql",
});
