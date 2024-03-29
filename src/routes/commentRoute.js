import { Router } from "express";
import CommentController from "../controllers/commentController.js";

const router = Router();
const commentController = new CommentController();

// comment/
router.get("/", (req, res) => {
    res.json("Comment Router!");
});

// add comment
router.post("/add", commentController.addComment);

// delete comment
router.delete("/delete/:id", commentController.removeComment);

// update comment
router.put("/update/:id", commentController.updateComment);

// get all comments by post id
router.get("/post/:id", commentController.getCommentsByPostId);

export default router;