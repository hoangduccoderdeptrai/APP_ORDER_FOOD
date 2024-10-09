// Import nodemailer
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
}); // Create transporter

// Import restaurant model
import { Restaurant } from "../../Model/restaurant.model.js";

// Import user model
import { User } from "../../Model/user.model.js";

// Import Menu model
import { MenuItem } from "../../Model/menuItem.model.js";

// Import searchHelper function
import search from "../../helper/search.js";

// Import paginationHelper function
import pagination from "../../helper/pagination.js";

// Import sendemail function
import sendemail from "../../helper/sendemail.js";

// Get all restaurant
const getPageRestaurants = async (req, res) => {
    try {
        // Find condition
        let find = {
            status: "active",
        };

        let objectSearch = search(req.query);

        // Check objectSearch has regex
        if (objectSearch.regex) {
            find["name"] = objectSearch.regex;
        }

        // Pagination
        const numberRestaurants = await Restaurant.countDocuments(find); // Count all restaurant
        const objectPagination = pagination(req.query, numberRestaurants, {
            currentPage: 1,
            limit: 4,
        }); // objectPagination

        // Find all restaurants
        const restaurants = await Restaurant.find(find)
            .limit(objectPagination.limit)
            .skip(objectPagination.skip);

        // Return Json
        res.status(200),
            json({
                restaurants: restaurants,
                objectPagination: objectPagination,
                keySearch: objectSearch.keyword,
            });
    } catch (err) {
        // Notificate Error
        res.status(500).json({ msg: err.message });
    }
};

// Get detail restaurant
const getDetailRetaurant = async (req, res) => {
    try {
        // Get id restaurant from params
        const id = req.params.id;

        // Find restaurant by id
        const restaurant = await Restaurant.findById(id);

        // Get ownerId's user from restaurant
        const ownerId = restaurant.ownerId;

        // Find user by ownerId
        const owner = await User.findById(ownerId).select("-password_account -email");

        // Count all menuItems of restaurant
        const numberMenuItems = await MenuItem.countDocuments({ restaurantId: id });

        // Return Json
        res.status(200).json({
            restaurant: restaurant,
            owner: owner,
            numberMenuItems: numberMenuItems,
        });
    } catch (err) {
        // Notificate Error
        res.status(500).json({ msg: err.message });
    }
};

// Stop active of restaurant
const changeStatusRestaurant = async (req, res) => {
    try {
        // Get id restaurant from params
        const id = req.params.id;

        // Find restaurant by id
        const restaurant = await Restaurant.findById(id);

        // Get ownerId's user from restaurant
        const ownerId = restaurant.ownerId;

        // Find user by ownerId
        const owner = await User.findById(ownerId).select("-password_account");

        // Get mail of user
        const emailOwner = owner.email;

        // Set status of restaurant
        if (restaurant.status == "inactive") {
            restaurant.status = "active";
        } else {
            restaurant.status = "inactive";
        }

        // Text content
        const textContent = `Nhà hàng ${restaurant.name} của bạn đã ${
            restaurant.status === "active" ? " Được hoạt động trở lại" : "Bị tạm dừng hoạt động"
        }. Vui lòng liên hệ với chúng tôi qua số điện thoại ${
            process.env.PHONE
        } để biết thêm thông tin`;

        // Send email to user
        sendemail(emailOwner, textContent);

        // Save restaurant
        await restaurant.save();

        // Return Json
        res.status(200).json({
            msg: "Update status restaurant was successful",
        });
    } catch (err) {
        // Notificate Error
        res.status(500).json({ msg: err.message });
    }
};

// Get all restaurant that is not accepted
const getPageAwaitRestaurants = async (req, res) => {
    try {
        // Find condition
        let find = {
            status: "pending",
        };

        let objectSearch = search(req.query);

        // Check objectSearch has regex
        if (objectSearch.regex) {
            find["name"] = objectSearch.regex;
        }

        // Pagination
        const numberRestaurants = await Restaurant.countDocuments(find); // Count all restaurant
        const objectPagination = pagination(req.query, numberRestaurants, {
            currentPage: 1,
            limit: 4,
        }); // objectPagination

        // Find all restaurants
        const restaurants = await Restaurant.find(find)
            .limit(objectPagination.limit)
            .skip(objectPagination.skip);

        // Return Json
        res.status(200).json({
            restaurants: restaurants,
            objectPagination: objectPagination,
            keySearch: objectSearch.keyword,
        });
    } catch (err) {
        // Notificate Error
        res.status(500).json({ msg: err.message });
    }
};

// Accept  or Deny restaurant
const acceptOrDenyRestaurant = async (req, res) => {
    try {
        // Get id restaurant from params
        const id = req.params.id;

        // Find restaurant by id
        const restaurant = await Restaurant.findById(id);

        // Set status of restaurant
        typeStatus = req.body.status;

        // Check typeStatus
        if (typeStatus == "accept") {
            // Set status of restaurant
            restaurant.status = "active";

            // Save restaurant
            await restaurant.save();

            // Return Json
            res.status(200).json({
                msg: "Update status restaurant was successful",
            });
        } else {
            // Deny restaurant
            const id_restaurant = req.params.id; // Get id from fe

            // Find restaurant by id
            const restaurant = await Restaurant.findById(id_restaurant);

            // Get ownerId's user from restaurant
            const ownerId = restaurant.ownerId;

            // Find user by ownerId
            const owner = await User.findById(ownerId).select("-password_account");

            // Get mail of user
            const emailOwner = owner.email;

            // Delte restaurant in DB
            await Restaurant.deleteOne({ _id: id_restaurant });

            // Text content
            const textContent = `Nhà hàng ${restaurant.name} của bạn đã bị từ chối hoạt động. Vui lòng liên hệ với chúng tôi qua số điện thoại ${process.env.PHONE} để biết thêm thông tin`;

            // Send email to user
            sendemail(emailOwner, textContent);

            // Return Json
            res.status(200).json({
                message: "Nhà hàng bị từ chối hoạt động, vui lòng check mail để kiểm tra thông tin",
            });
        }
    } catch (err) {
        // Notificate Error
        res.status(500).json({ msg: err.message });
    }
};

export {
    getPageRestaurants,
    getDetailRetaurant,
    changeStatusRestaurant,
    getPageAwaitRestaurants,
    acceptOrDenyRestaurant,
};
