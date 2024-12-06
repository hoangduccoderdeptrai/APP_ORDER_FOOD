// Import SpecialtyFood model
import { SpecialtyFood } from "../../Model/specialtyFood.model.js";

// Import cloudinary
import { Cloudinary } from "../../config/cloundinaryCofig.js";

// Import search hepler
import { search } from "../../helper/search.js";

// Import pagination helper
import { pagination } from "../../helper/pagination.js";

// Import deleteTempFiles helper
import { deleteTempFiles } from "../../helper/deleteFileInUpload.js";

// Get all specialtyFood
const getAllSpecialtyFood = async (req, res) => {
    try {
        // Find condition
        let find = {};

        // Search object
        const objectSearch = search(req.query.keyword);

        // Check if has keyword
        if (objectSearch.regex) {
            find["name"] = objectSearch.regex;
        }

        // Pagination
        const numSpecialtyFoods = await SpecialtyFood.countDocuments(find); // Count all specialtyFood

        const objectPagination = pagination(req.query, numSpecialtyFoods, {
            currentPage: 1,
            limit: 8,
        }); // Get pagination object

        const specialtyFoods = await SpecialtyFood.find(find)
            .limit(objectPagination.limit)
            .skip(objectPagination.skip);

        // Check if specialtyFoods is empty
        if (!specialtyFoods || specialtyFoods.length === 0) {
            return res.status(200).json({
                msg: "SpecialtyFoods is empty",
            });
        }

        // Return response
        res.status(200).json({
            specialtyFoods: specialtyFoods,
            objectPagination: objectPagination,
        });
    } catch (err) {
        // Return error message
        res.status(500).json({
            msg: err.message,
        });
    }
};

// Create specialtyFood
const createSpecialtyFood = async (req, res) => {
    try {
        // Get name of specialtyFood from request
        const name = req.body.name;

        // Get all specialtyFood
        const specialtyFood = await SpecialtyFood.findOne({ name: name });

        if (specialtyFood) {
            return res.status(400).json({
                msg: "SpecialtyFood is exist",
            });
        }

        // Upload to cloudinary
        const file = req.file; // Get file img from request

        const result = await Cloudinary.uploader.upload(file.path, {
            folder: "Item_images",
        }); // Upload to cloudinary

        // Image source
        const image_url = {
            url: result.secure_url,
            public_id: result.public_id,
        };

        // Delete file temporarity
        deleteTempFiles([file]);

        // Create new specialtyFood
        const newSpecialtyFood = new SpecialtyFood({
            name: name,
            imageUrl: image_url,
        });

        // Save specialtyFood
        await newSpecialtyFood.save();

        // Return Json
        res.status(200).json({
            msg: "Create specialtyFood was successful",
        });
    } catch (err) {
        // Return error message
        res.status(500).json({
            msg: err.message,
        });
    }
};

// Get page edit specialtyFood
const getPageEditSpecialtyFood = async (req, res) => {
    try {
        // Get id from params
        const id = req.params.id;

        // Find specialtyFood by id
        const specialtyFood = await SpecialtyFood.findById(id);

        // Check if specialtyFood is not exist
        if (!specialtyFood) {
            return res.status(404).json({
                msg: "SpecialtyFood is not exist",
            });
        }

        // Return response
        res.status(200).json({
            specialtyFood: specialtyFood,
        });
    } catch (err) {
        // Return error message
        res.status(500).json({
            msg: err.message,
        });
    }
};

// Update specialtyFood
const editSpecialtyFood = async (req, res) => {
    try {
        // Get if from params
        const id = req.params.id;

        // Get specialtyFood from id
        const specialtyFood = await SpecialtyFood.findById(id);

        // Check if specialtyFood is not exist
        if (!specialtyFood) {
            return res.status(404).json({
                msg: "SpecialtyFood is not exist",
            });
        }

        // Get name from request
        const name = req.body.name;

        // Get file from request
        const file = req.file;

        // check name is exist that not of specialtyFood
        const oldSpecialtyFood = await SpecialtyFood.findOne({ name: name });
        if (oldSpecialtyFood && oldSpecialtyFood._id.toString() !== id) {
            return res.status(400).json({
                msg: "SpecialtyFood's name is exist",
            });
        }

        // Delete file in cloudinary
        await Cloudinary.uploader.destroy(specialtyFood.imageUrl.public_id);

        // Upload new file to cloudinary
        const result = await Cloudinary.uploader.upload(file.path, {
            folder: "Item_images",
        });

        // Image source
        const image_url = {
            url: result.secure_url,
            public_id: result.public_id,
        };

        // Delete file temporarity
        deleteTempFiles([file]);

        // Update specialtyFood
        specialtyFood.name = name;
        specialtyFood.imageUrl = image_url;

        // Save specialtyFood
        await specialtyFood.save();

        // Return response
        res.status(200).json({
            msg: "Update specialtyFood was successful",
        });
    } catch (err) {
        // Return error message
        res.status(500).json({
            msg: err.message,
        });
    }
};

// Delete specialtyFood
const deleteSpecialtyFood = async (req, res) => {
    try {
        // Get id from parmas
        const id = req.params.id;

        // Find specialtyFood by id and delete
        await SpecialtyFood.findByIdAndDelete(id);

        // Return response
        res.status(200).json({
            msg: "Delete specialtyFood was successful",
        });
    } catch (err) {
        // Return error message
        res.status(500).json({
            msg: err.message,
        });
    }
};

// Export controller
export {
    getAllSpecialtyFood,
    createSpecialtyFood,
    getPageEditSpecialtyFood,
    editSpecialtyFood,
    deleteSpecialtyFood,
};
