import { Router } from "express";
import CategoryController from "../controllers/categoryController.js";

const router = Router();

const categoryModel = new CategoryController();

// category/

router.get("/", (req, res) => {
    res.json("Category Router!");
});

// add category
router.post("/add", categoryModel.addCategory);

// delete category
router.delete("/delete/:id", categoryModel.removeCategory);

// get category
router.get("/get/:id", categoryModel.getCategory);

// get all categories
router.get("/get", categoryModel.getAllCategories);

// update category
router.put("/update/:id", categoryModel.updateCategory);



export default router;