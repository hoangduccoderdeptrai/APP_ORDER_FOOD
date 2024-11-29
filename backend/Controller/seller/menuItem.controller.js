import { Cloudinary } from "../../config/cloundinaryCofig.js";
import { MenuItem } from "../../Model/menuItem.model.js";
import { Restaurant } from "../../Model/restaurant.model.js";
import fs from "fs";
import { hasUncaughtExceptionCaptureCallback } from "process";

// Import deleteTermFiles helper function
import { deleteTempFiles } from "../../helper/deleteFileInUpload.js";

// Create new Item
const createMenuItem = async (req, res) => {
    try {
        // Get all files from request
        const files = req.files;

        // Get all data from request
        const { title, description, price, category } = req.body;
        const restaurantId = req.user.restaurantId;

        // Get restaurant by id and check if it is exist
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant)
            return res.status(404).json({ msg: "restaurant not found when creating item" });

        // Check restaurant is active
        if (restaurant.status !== "active")
            return res.status(400).json({ msg: "Restaurant is not active" });

        // Get fileds images from files
        const images = files["images"];

        // Check if images is exist
        if (!images || images.length === 0) {
            return res.status(400).json({ msg: "Images is empty" });
        }

        // Upload all images to Cloudinary
        const uploadPromises = images.map((file) => {
            return Cloudinary.uploader.upload(file.path, {
                folder: "Item_images", //name of folder in Cloundinary that will store all images
            });
        });

        // Wait for all images to be uploaded at the same time
        const uploadedImages = await Promise.all(uploadPromises);
        const images_url = uploadedImages.map((image) => {
            return {
                url: image.secure_url,
                public_id: image.public_id,
            };
        });

        // Create new Item
        const newItem = new MenuItem({
            restaurantId,
            imageUrl: images_url,
            title,
            description,
            price,
            category,
        });

        // Save new Item to DB
        await newItem.save();

        // Delete all temporary files
        deleteTempFiles(images);

        // Return response
        return res.status(200).json({ msg: "Creating MenuItem was successful" });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: err.message });
    }
};

// Update Item
const updateMenuItem = async (req, res) => {
    try {
        const { title, description, price, category, isAvailable, discount, quantity } = req.body;
        const restaurantId = req.user.restaurantId;

        // Get all files from request
        console.log(req.files, "files");
        const files = req.files;

        // Find menuItem by id
        const menuItemId = req.params.id;
        const menuItem = await MenuItem.findById(menuItemId);
        console.log(menuItem);

        // Check if menuItem is exist
        if (!menuItem) return res.status(404).json({ msg: "menuItem not found" });

        // Check if restaurant is exist
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) return res.status(404).json({ msg: "restaurant was not found" });

        // Check if restaurant is active
        if (restaurant.status !== "active") {
            return res.status(400).json({ msg: "Restaurant is not active" });
        }

        // Check restaurantId is match with restaurantId in menuItem
        if (restaurantId !== menuItem.restaurantId.toString()) {
            return res.status(400).json({ msg: "restaurant has not this menuItem" });
        }

        // Upload images to Cloudinary
        let img_url = null;
        let listImages = files["images"];
        if (listImages && listImages.length > 0) {
            const imagePromises = listImages.map((file) => {
                return Cloudinary.uploader.upload(file.path, {
                    folder: "Item_images",
                });
            });
            const uploadCloudinnary = await Promise.all(imagePromises);
            img_url = uploadCloudinnary.map((file) => {
                return {
                    url: file.secure_url,
                    public_id: file.public_id,
                };
            });
        }

        if (img_url && img_url.length > 0) {
            // delete url Cloudinary
            const url_Cloudinary = menuItem.imageUrl;
            const deletePromises = url_Cloudinary.map((file) => {
                return Cloudinary.uploader.destroy(file.public_id);
            });
            await Promise.all(deletePromises);
            menuItem.imageUrl = img_url;
        }

        // Update menuItem
        if (title) menuItem.title = title;
        if (description) menuItem.description = description;
        if (price) menuItem.price = parseInt(price) || menuItem.price;
        if (quantity) menuItem.quantity = parseInt(quantity) || menuItem.quantity;
        if (discount) menuItem.discount = parseInt(discount) || menuItem.discount;
        if (category) menuItem.category = category;
        if (isAvailable) menuItem.isAvailable = isAvailable;

        // Save menuItem
        await menuItem.save();

        // Return response
        return res.status(200).json({ msg: "MenuItem updated successfully" });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ msg: err.message });
    }
};

// Delete Item
const deleteMenuItem = async (req, res) => {
    try {
        // Find menuItem by id
        const menuItemId = req.params.id;
        const menuItem = await MenuItem.findById(menuItemId);
        if (!menuItem) return res.status(404).json({ msg: "menuItem not found to delete" });

        // Get restaurantId from menuItem
        const restaurantIdMenuItem = menuItem.restaurantId;

        // Get restaurantId from user
        const restaurantIdOwner = req.user.restaurantId;

        // Check if restaurantId from menuItem is match with restaurantId from user
        if (restaurantIdMenuItem.toString() !== restaurantIdOwner) {
            return res.status(400).json({ msg: "restaurant has not this menuItem" });
        }

        // Delete all images in Cloudinary
        const public_Id_Arr = menuItem.imageUrl.map((val) => val.public_id);
        const deleteImgCloundinary = public_Id_Arr.map((id) => Cloudinary.uploader.destroy(id));
        await Promise.all(deleteImgCloundinary);

        // Delete menuItem in DB
        await MenuItem.findByIdAndDelete(menuItemId);

        // Return response
        return res.status(200).json({ msg: "deleting menuItem was successfull" });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: err.message });
    }
};

// fetch all item
const fetchAllItems = async (req, res) => {
    try {
        const restaurantId = req.user.restaurantId;
        const menuItem = await MenuItem.find({ restaurantId: restaurantId });
        return res.status(200).json({ data: menuItem });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export { deleteMenuItem, createMenuItem, updateMenuItem, fetchAllItems };
