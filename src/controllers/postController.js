import posts from '../models/postModel.js';

export default class PostController {

    // add post
    async addPost(req, res) {
        // check if title, body, categoryId, userId is provided
        if (!req.body.title || !req.body.body || !req.body.categoryId || !req.body.userId) {
            return res.status(400).json({ message: "Please provide title, body, image, categoryId, userId" });
        }
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

    // get all posts
    async getAllPosts(req, res) {
        try {
            // check if posts found
            const response = await posts.findAll();
            response ? res.status(200).json({
                message: "Posts found successfully", data: response
            }) : res.status(400).json({ message: "Posts not found" });

        } catch (error) {
            console.log("Error getting all posts: ", error);
        }
    }
    async getPostByLimit(req, res) {
        try {
            const { limit } = req.params;

            const l = Number(limit);
            // get posts with limit
            if (l) {
                const response = await posts.findAll(
                    {
                        limit: l
                    }
                );
                response ? res.status(200).json({
                    message: "Posts found successfully", data: response
                }) : res.status(400).json({ message: "Posts not found" });
            }

        } catch (error) {
            console.log("Error getting post:", error)
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
        // check if title, body, categoryId, userId is provided
        if (!req.body.title || !req.body.body || !req.body.categoryId || !req.body.userId) {
            return res.status(400).json({ message: "Please provide title, body, image, categoryId, userId" });
        }
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

