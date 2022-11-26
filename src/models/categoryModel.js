import { DataTypes } from "sequelize";
import dbConnection from "./index.js";

const categories = dbConnection.define("categories", {
    // category model attributes
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

});

export default categories;