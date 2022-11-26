import comments from '../models/commentModel.js';

export default class CommentController {
    // add comment
    async addComment(req, res) {
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

    // get comment
    async getComment(req, res) {
        try {
            const response = await comments.findOne({ where: { id: req.params.id } });
            // check if comment found
            response ? res.status(200).json({
                message: "Comment found successfully", data: response
            }) : res.status(400).json({ message: "Comment not found" });
        } catch (error) {
            console.log("Error getting comment: ", error);
        }
    }

    // update comment
    async updateComment(req, res) {
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