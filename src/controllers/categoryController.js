import categoryModel from "../models/categoryModel.js"

export default class CategoryController {

    // add category
    async addCategory(req, res) {
        try {
            const response = await categoryModel.create({ ...req.body });
            // check if category created
            response ? res.status(201).json({
                message: "Category created successfully", data: response
            }) : res.status(400).json({ message: "Category not created" });


        } catch (error) {
            console.log("Error adding category: ", error);
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
            const response = await categoryModel.findOne({ where: { id: req.params.id } });
            // check if category found
            response ? res.status(200).json({
                message: "Category found successfully", data: response
            }) : res.status(400).json({ message: "Category not found" });

        } catch (error) {
            console.log("Error getting category: ", error);
        }

    }
    // update category
    async updateCategory(req, res) {
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