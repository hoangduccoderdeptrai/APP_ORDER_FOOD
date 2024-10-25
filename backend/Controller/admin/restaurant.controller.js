// Import restaurant model
import { Restaurant } from "../../Model/restaurant.model.js";

// Import account model
import { Account } from "../../Model/account.model.js";

// Import Menu model
import { MenuItem } from "../../Model/menuItem.model.js";

// Import searchHelper function
import { search } from "../../helper/search.js";

// Import paginationHelper function
import { pagination } from "../../helper/pagination.js";

// Import sendemail function
import { sendemail } from "../../helper/sendemail.js";

// Get all restaurant
const getPageRestaurants = async (req, res) => {
    try {
        // Find condition
        let find = {
            status: "active",
        };

        let objectSearch = search(req.query.keyword);

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

// Get detail restaurant
const getDetailRetaurant = async (req, res) => {
    try {
        // Get id restaurant from params
        const id = req.params.id;

        // Find restaurant by id
        const restaurant = await Restaurant.findById(id);

        // Get ownerId's account from restaurant
        const ownerId = restaurant.ownerId;

        // Find account by ownerId
        const owner = await Account.findById(ownerId).select("-password_account");

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

// Change status of restaurant
const changeStatusRestaurant = async (req, res) => {
    try {
        // Get id restaurant from params
        const id = req.params.id;

        // Find restaurant by id
        const restaurant = await Restaurant.findById(id);

        // Get ownerId's account from restaurant
        const ownerId = restaurant.ownerId;

        // Find account by ownerId
        const owner = await Account.findById(ownerId).select("-password_account");

        // Get mail of account
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

        // Send email to account
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

        let objectSearch = search(req.query.keyword);

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
        const typeStatus = req.body.status;

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
            // Get ownerId's account from restaurant
            const ownerId = restaurant.ownerId;

            // Find account by ownerId
            const owner = await Account.findById(ownerId).select("-password_account");

            // Get mail of account
            const emailOwner = owner.email;

            // Delte restaurant in DB
            await Restaurant.deleteOne({ _id: id_restaurant });

            // Text content
            const textContent = `Nhà hàng ${restaurant.name} của bạn đã bị từ chối hoạt động. Vui lòng liên hệ với chúng tôi qua số điện thoại ${process.env.PHONE} để biết thêm thông tin`;

            // Send email to account
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
