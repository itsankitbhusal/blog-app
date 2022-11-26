import { Router } from "express";
import PostController from "../controllers/postController.js";

const router = Router();
const postController = new PostController();

// post/
router.get("/", (req, res) => {
    res.json("Post Router!");
});

// add post
router.post("/add", postController.addPost);

// delete post
router.delete("/delete/:id", postController.removePost);

// get post
router.get("/get/:id", postController.getPost);

// update post
router.put("/update/:id", postController.updatePost);

export default router;