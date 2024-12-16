import { console } from "inspector/promises";
import { Restaurant } from "../../Model/restaurant.model.js";
import { Cloudinary } from "../../config/cloundinaryCofig.js";

// Import deleteTempFiles helper
import { deleteTempFiles } from "../../helper/deleteFileInUpload.js";

const getRestaurant = async (req, res) => {
    try {
        // Get restaurant
        const restaurantId = req.user.restaurantId;

        // Find restaurant by id
        const restaurant = await Restaurant.findById(restaurantId);

        // Check if restaurant exist
        if (!restaurant) {
            return res.status(404).json({
                msg: "Restaurant not found",
            });
        }

        return res.status(200).json({
            restaurant: restaurant,
        });
    } catch (error) {
        return res.status(500).json({
            msg: error.message,
        });
    }
};

const editRestaurant = async (req, res) => {
    try {
        // Get information of restaurant
        const { name, address, phone, time_open, time_close, description, index } = req.body;

        // Get restaurant id
        const restaurantId = req.user.restaurantId;

        // Find restaurant by id
        const restaurant = await Restaurant.findById(restaurantId);

        // Check if restaurant exist
        if (!restaurant) {
            return res.status(404).json({
                msg: "Restaurant not found",
            });
        }

        // Check name of restaurant is unique
        const restaurantName = await Restaurant.findOne({ name: name }).select("_id");
        if (restaurantName && restaurantName._id.toString() !== restaurantId.toString()) {
            return res.status(400).json({
                msg: "Restaurant name is already exist",
            });
        }

        // Update restaurant information
        if (name) {
            restaurant.name = name;
        }
        if (address) {
            restaurant.address = JSON.parse(address);
        }
        if (phone) {
            restaurant.phone = phone;
        }
        if (time_open) {
            restaurant.time_open = time_open;
        }
        if (time_close) {
            restaurant.time_close = time_close;
        }
        if (description) {
            restaurant.description = description;
        }
        // Get image from request
        let avatar = req.files.avatar || [null];
        let images = req.files.images || [];
        let arrIndexEdit = JSON.parse(index) || [];

        // Merge array images
        const arrImages = [...images];
        if (avatar[0]) {
            arrIndexEdit.unshift(-1);
            arrImages = [...avatar, ...images];
        }
        arrIndexEdit = arrIndexEdit.map((index) => index + 1);

        // Delete old images in cloudinary
        const promiseDeleteImage = arrIndexEdit.map(async (value) => {
            if (!value) return;
            let public_id = restaurant.imageUrl[value].public_id;
            await Cloudinary.uploader.destroy(public_id);
        });
        await Promise.all(promiseDeleteImage);

        // Upload new images
        let indexUpload = 0;
        const promiseUploadNewImages = restaurant.imageUrl.map(async (image, index) => {
            if (arrIndexEdit.includes(index)) {
                console.log(index);
                console.log(arrImages[indexUpload]);
                let result = await Cloudinary.uploader.upload(arrImages[indexUpload++].path, {
                    folder: "Item_images",
                });
                return {
                    url: result.secure_url,
                    public_id: result.public_id,
                };
            } else return image;
        });

        const newImageUrl = await Promise.all(promiseUploadNewImages);

        // Update imageUrl
        restaurant.imageUrl = newImageUrl;

        // Delete temp files
        deleteTempFiles(arrImages);

        // Check status of restaurant
        let currentStatus = restaurant.status;
        if (currentStatus === "deny" || currentStatus === "inactive") {
            restaurant.status = "pending";
        }

        // Save restaurant
        await restaurant.save();

        return res.status(200).json({
            msg: "Update restaurant successfully",
        });
    } catch (error) {
        return res.status(500).json({
            msg: error.message,
        });
    }
};

export { editRestaurant, getRestaurant };
