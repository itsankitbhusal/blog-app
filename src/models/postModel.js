import dbConnection from "./index.js";
import { DataTypes } from "sequelize";

const posts = dbConnection.define("posts", {
    // post model attributes
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    // title, body, image, cateogry id , user id
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    body: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

// make foreign key relationship with users table for user_id
posts.belongsTo(dbConnection.models.users, {
    foreignKey: "userId",
    targetKey: "id",
});

// make foreign key relationship with categories table for categoryId
posts.belongsTo(dbConnection.models.categories, {
    foreignKey: "categoryId",
    targetKey: "id",
});

export default posts;