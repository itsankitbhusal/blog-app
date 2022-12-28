import comments from '../models/commentModel.js';
import User from '../models/userModel.js';

export default class CommentController {
    // add comment
    async addComment(req, res) {
        // check if userId, postId, and content is provided
        if (!req.body.userId || !req.body.postId || !req.body.content) {
            return res.status(400).json({ message: "Please provide userId, postId, and comment" });
        }
        try {
            const response = await comments.create({ ...req.body });
            // check if comment created
            response ? res.status(201).json({
                message: "Comment created successfully", data: response
            }) : res.status(400).json({ message: "Comment not created" });


        } catch (error) {
            console.log("Error adding comment: ", error);
        }
    }

    // delete comment
    async removeComment(req, res) {
        try {
            const response = await comments.destroy({ where: { id: req.params.id } });
            // check if comment deleted
            response ? res.status(200).json({
                message: "Comment deleted successfully", data: response
            }) : res.status(400).json({ message: "Comment not deleted" });


        } catch (error) {
            console.log("Error removing comment: ", error);
        }
    }

    // update comment
    async updateComment(req, res) {
        // check if userId, postId, and content is provided
        if (!req.body.content || !req.params.id) {
            return res.status(400).json({ message: "Please provide commentId and comment" });
        }
        try {
            console.log("req body", req.body)
            console.log("param", req.params);
            const response = await comments.update
                ({ ...req.body }, { where: { id: req.params.id } });
            // check if comment updated
            response ? res.status(200).json({
                message: "Comment updated successfully", data: response
            }) : res.status(400).json({ message: "Comment not updated" });
        } catch (error) {
            console.log("Error updating comment: ", error);
        }
    }

    // get all comments by post id
    async getCommentsByPostId(req, res) {
        // check if postId is provided
        if (!req.params.id) {
            return res.status(400).json({ message: "Please provide postId" });
        }
        try {
            const response = await comments.findAll({
                where: { postId: req.params.id },
                attributes: { exclude: ['userId', 'postId'] },
                include: [
                    {
                        model: User,
                        attributes: ['email']
                    }
                ]
            });
            // check if comments found
            response ? res.status(200).json({
                message: "Comments found successfully", data: response
            }) : res.status(400).json({ message: "Comments not found" });
        } catch (error) {
            console.log("Error getting comments: ", error);
        }
    }
}