import posts from '../models/postModel.js';

export default class PostController {

    // add post
    async addPost(req, res) {
        try {
            const response = await posts.create({ ...req.body });
            // check if post created
            response ? res.status(201).json({
                message: "Post created successfully", data: response
            }) : res.status(400).json({ message: "Post not created" });

        } catch (error) {
            console.log("Error adding post: ", error);
        }
    }

    // delete post
    async removePost(req, res) {
        try {
            const response = await posts.destroy({ where: { id: req.params.id } });
            // check if post deleted
            response ? res.status(200).json({
                message: "Post deleted successfully", data: response
            }) : res.status(400).json({ message: "Post not deleted" });

        } catch (error) {
            console.log("Error removing post: ", error);
        }
    }

    // get post
    async getPost(req, res) {
        try {
            const response = await posts.findOne({ where: { id: req.params.id } });
            // check if post found
            response ? res.status(200).json({
                message: "Post found successfully", data: response
            }) : res.status(400).json({ message: "Post not found" });

        } catch (error) {
            console.log("Error getting post: ", error);
        }
    }

    // update post
    async updatePost(req, res) {
        try {
            const response = await posts.update({ ...req.body }, { where: { id: req.params.id } });
            // check if post updated
            response ? res.status(200).json({
                message: "Post updated successfully", data: response
            }) : res.status(400).json({ message: "Post not updated" });


        } catch (error) {
            console.log("Error updating post: ", error);
        }
    }

}

