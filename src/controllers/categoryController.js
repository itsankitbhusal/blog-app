import categoryModel from "../models/categoryModel.js"

export default class CategoryController {

    // add category
    async addCategory(req, res) {
        console.log("req.body: ", req.body);
        const { name } = req.body;
        // check if name is already in database
        const categoryExists = await categoryModel.findOne({ where: { name } });
        // check if category exists
        if (categoryExists) {
            return res.status(400).json({ error: "Category already exists!" });
        } else {
            try {
                if (req.body.name) {

                    const response = await categoryModel.create({ ...req.body });
                    // check if category created
                    response ? res.status(201).json({
                        message: "Category created successfully", data: response
                    }) : res.status(400).json({ message: "Category not created" });

                } else {
                    res.status(400).json({ message: "Category name is required" });
                }
            } catch (error) {
                console.log("Error adding category: ", error);
            }
        }

    }
    // delete category
    async removeCategory(req, res) {
        try {
            const response = await categoryModel.destroy({ where: { id: req.params.id } });
            // check if category deleted
            response ? res.status(200).json({
                message: "Category deleted successfully", data: response
            }) : res.status(400).json({ message: "Category not deleted" });

        } catch (error) {
            console.log("Error removing category: ", error);
        }
    }
    // get category
    async getCategory(req, res) {
        try {
            const response = await categoryModel.findOne({ where: { id: req.params.id }, attributes: ["id", "name"] });
            // check if category found
            response ? res.status(200).json({
                message: "Category found successfully", data: response
            }) : res.status(400).json({ message: "Category not found" });

        } catch (error) {
            console.log("Error getting category: ", error);
        }

    }
    // get all categories
    async getAllCategories(req, res) {
        try {
            const response = await categoryModel.findAll({ attributes: ["id", "name"] });
            // check if categories found
            response ? res.status(200).json({
                message: "Categories found successfully", data: response
            }) : res.status(400).json({ message: "Categories not found" });


        } catch (error) {
            console.log("Error getting all categories: ", error);
        }
    }

    // update category
    async updateCategory(req, res) {
        // check if name is provided
        if (!req.body.name) {
            return res.status(400).json({ message: "Category name is required" });
        }
        if (!req.params.id) {
            return res.status(400).json({ message: "Category id is required" });
        }

        try {
            const response = await categoryModel.update({ ...req.body }, { where: { id: req.params.id } });
            // check if category updated
            response ? res.status(200).json({
                message: "Category updated successfully", data: response
            }) : res.status(400).json({ message: "Category not updated" });

        } catch (error) {
            console.log("Error updating category: ", error);
        }

    }


}