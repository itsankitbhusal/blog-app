import comments from '../models/commentModel.js';

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
        if (!req.body.userId || !req.body.postId || !req.body.content) {
            return res.status(400).json({ message: "Please provide userId, postId, and comment" });
        }
        try {
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
}