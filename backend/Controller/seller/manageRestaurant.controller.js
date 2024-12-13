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
        const { name, address, phone, time_open, time_close, description } = req.body;

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

        // Update restaurant information
        if (name) {
            restaurant.name = name;
        }
        if (address) {
            restaurant.address = address;
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
        if (req.files) {
            // Get image from request
            const avatar = req.files.avatar;
            const images = req.files.images;

            // Merge array images
            const arrImages = [...avatar, ...images];

            // Delete old image
            promiseDeleteImage = restaurant.imageUrl.map((image) => {
                return Cloudinary.uploader.destroy(image.public_id);
            });
            await Promise.all(promiseDeleteImage);

            // Upload new image
            promiseuploadNewImages = arrImages.map((image) => {
                return Cloudinary.uploader.upload(image.path, {
                    folder: "Item_images",
                });
            });

            const newImageUrl = await Promise.all(promiseuploadNewImages);

            // Update imageUrl
            restaurant.imageUrl = newImageUrl;

            // Delete temp files
            deleteTempFiles(arrImages);
        }

        // Check status of restaurant
        currentStatus = restaurant.status;
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
