import { Cloudinary } from "../../config/cloundinaryCofig.js";
import { MenuItem } from "../../Model/menuItem.model.js";
import { Restaurant } from "../../Model/restaurant.model.js";
import fs from "fs";
import { hasUncaughtExceptionCaptureCallback } from "process";

// Create new Item
const createMenuItem = async (req, res) => {
    try {
        // Get all files from request
        const files = req.files;

        // Check if files is empty
        if (!files) return res.status(404).json({ msg: "Image files was required" });

        // Get all data from request
        const { restaurantId, title, description, price, category } = req.body;

        // Get restaurant by id and check if it is exist
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant)
            return res.status(404).json({ msg: "restaurant not found when creating Item" });

        // Check restaurant is active
        if (restaurant.status !== "active")
            return res.status(400).json({ msg: "Restaurant is not active" });

        // Get fileds images from files
        const images = files["images"];

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
        const { restaurantId, title, description, price, category, isAvailable } = req.body;

        console.log(req.files, "files");
        const files = req.files;
        const menuItemId = req.params.id;
        const menuItem = await MenuItem.findById(menuItemId);
        console.log(menuItem);
        if (!menuItem) return res.status(404).json({ msg: "menuItem not found" });
        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant) return res.status(404).json({ msg: "restaurant was not found" });
        let img_url = null;
        if (files && files.length > 0) {
            const imagePromises = files.map((file) => {
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
        // console.log(img_url);
        if (img_url && img_url.length > 0) {
            // delete url Cloudinary
            const url_Cloudinary = menuItem.imageUrl;
            const deletePromises = url_Cloudinary.map((file) => {
                return Cloudinary.uploader.destroy(file.public_id);
            });
            await Promise.all(deletePromises);
            menuItem.imageUrl = img_url;
        }
        if (title) {
            menuItem.title = title;
        }
        if (description) menuItem.description = description;
        if (price) menuItem.price = price;
        if (category) menuItem.category = category;
        if (isAvailable !== undefined) menuItem.isAvailable = isAvailable;
        await menuItem.save();
        return res.status(200).json({ msg: "MenuItem updated successfully" });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ msg: err.message });
    }
};

// delete
const deleteMenuItem = async (req, res) => {
    try {
        const menuItemId = req.params.id;
        const menuItem = await MenuItem.findById(menuItemId);
        if (!menuItem) return res.status(404).json({ msg: "menuItem not found to delete" });
        const public_Id_Arr = menuItem.imageUrl.map((val) => val.public_id);

        const deleteImgCloundinary = public_Id_Arr.map((id) => Cloudinary.uploader.destroy(id));
        await Promise.all(deleteImgCloundinary);
        await menuItem.deleteOne();
        return res.status(200).json({ msg: "deleting menuItem was successfull" });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ msg: err.message });
    }
};

// delete temporary folder when uploading images to cloundinary
const deleteTempFiles = (files) => {
    files.forEach((file) => {
        fs.unlink(file.path, (err) => {
            if (err) console.log("Failed to delete file", file.path, err.message);
        });
    });
};

// fetch all item
const fetchAllItems = async (req, res) => {
    try {
        const restaurantId = req.params.id;
        const menuItem = await MenuItem.find({ restaurantId: restaurantId });
        return res.status(200).json({ data: menuItem });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};

export { deleteMenuItem, createMenuItem, updateMenuItem, fetchAllItems };
