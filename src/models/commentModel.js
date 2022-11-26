import { DataTypes } from "sequelize";
import dbConnection from "./index.js";

const comments = dbConnection.define("comments", {
    // comment model attributes
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});

// make foreign key relationship with users table for userId
comments.belongsTo(dbConnection.models.users, {
    foreignKey: "userId",
    targetKey: "id",
});

// make foreign key relationship with posts table for postId
comments.belongsTo(dbConnection.models.posts, {
    foreignKey: "postId",
    targetKey: "id",
});

export default comments;