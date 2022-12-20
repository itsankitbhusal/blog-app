import posts from '../models/postModel.js';
import category from "../models/categoryModel.js"
import user from "../models/userModel.js"
export default class PostController {

    // add post
    async addPost(req, res) {
        // check if title, body, categoryId, userId is provided
        if (!req.body.title || !req.body.body || !req.body.categoryId || !req.body.userId) {
            return res.status(400).json({ message: "Please provide title, body, image, categoryId, userId" });
        }
        // user should be able to add more than one category to a post
        // check if categoryId is an array
        // if (Array.isArray(req.body.categoryId)) {
        //     // check if categoryId array is empty
        //     if (req.body.categoryId.length === 0) {
        //         return res.status(400).json({ message: "Please provide categoryId" });
        //     }
        // }

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
                        attributes: { exclude: ['userId', 'categoryId', 'updatedAt'] },
                        include: [{
                            model: category,
                            required: true,
                            attributes: { exclude: ['createdAt', 'updatedAt'] }
                        },
                        {
                            model: user,
                            required: true,
                            attributes: { exclude: ['createdAt', 'updatedAt', 'password', 'email'] }
                        }

                        ],
                        // get above data in descending order
                        order: [['id', 'DESC']],
                        limit: l,
                    },

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
            const response = await posts.findOne({
                where: { id: req.params.id },
                attributes: { exclude: ['userId', 'categoryId', 'updatedAt'] },
                include: [{
                    model: category,
                    required: true,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                }, {
                    model: user,
                    required: true,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'password', 'email'] }
                }]
            });
            // check if post found
            response ? res.status(200).json({
                message: "Post found successfully", data: response
            }) : res.status(400).json({ message: "Post not found" });

        } catch (error) {
            console.log("Error getting post: ", error);
        }
    }

    // get post by user id and email
    async getPostByUser(req, res) {
        const id = Number(req.body.id);

        if (!id) {
            return res.status(400).json({ message: "Please provide id user" });
        }
        try {
            const response = await posts.findAll({
                where: {
                    userId: id,
                },
                attributes: { exclude: ['userId', 'categoryId', 'updatedAt'] },
                include: [{
                    model: category,
                    required: true,
                    attributes: { exclude: ['createdAt', 'updatedAt'] }
                },
                {

                    model: user,
                    required: true,
                    attributes: { exclude: ['createdAt', 'updatedAt', 'password', 'email'] }
                }],

            });
            response ? res.status(200).json({
                message: "Posts found successfully", data: response
            }) : res.status(400).json({ message: "Posts not found" });

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

