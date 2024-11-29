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
        // Get status from query
        const status = req.query.status;

        // Find condition
        let find = {
            status: status,
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

        // Check if restaurants is empty
        if (!restaurants || restaurants.length == 0) {
            return res.status(200).json({ msg: "Not found any restaurant" });
        }

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

        // Check if restaurant is empty
        if (!restaurant) {
            return res.status(200).json({ msg: "Not found restaurant" });
        }

        // Get ownerId's account from restaurant
        const ownerId = restaurant.ownerId;

        // Find account by ownerId
        const owner = await Account.findById(ownerId).select(
            "-password_account -address -name_account"
        );

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

        // Check if restaurant is empty
        if (!restaurant) {
            return res.status(200).json({ msg: "Not found restaurant" });
        }

        // Set status of restaurant
        const typeStatus = req.body.status;

        // Get ownerId's account from restaurant
        const ownerId = restaurant.ownerId;

        // Find account by ownerId
        const owner = await Account.findById(ownerId).select(
            "-password_account -address -name_account"
        );

        // Get mail of account
        const emailOwner = owner.email;

        // Text content
        let textContent = "";

        // Check typeStatus
        if (typeStatus == "accept") {
            textContent = `Nhà hàng ${restaurant.name} của bạn đã được chấp nhận hoạt động. Chúc bạn có một ngày tốt lành!`;
            restaurant.status = "active";
        } else if (typeStatus == "deny") {
            textContent = `Nhà hàng ${restaurant.name} của bạn đã bị từ chối hoạt động. Vui lòng liên hệ với chúng tôi qua số điện thoại ${process.env.PHONE} để biết thêm thông tin`;
        } else if (typeStatus == "inactive") {
            textContent = `Nhà hàng ${restaurant.name} của bạn đã bị tạm dừng hoạt động. Vui lòng liên hệ với chúng tôi qua số điện thoại ${process.env.PHONE} để biết thêm thông tin`;
            restaurant.status = "active";
        } else if (typeStatus == "active") {
            textContent = `Nhà hàng ${restaurant.name} của bạn đã được hoạt động trở lại" : "Bị tạm dừng hoạt động"
            }. Vui lòng liên hệ với chúng tôi qua số điện thoại ${process.env.PHONE} để biết thêm thông tin`;
            restaurant.status = "inactive";
        } else {
            // status is not valid
            return res.status(400).json({ msg: "Status is not valid" });
        }

        if (textContent != "") {
            // Send email to account
            sendemail(emailOwner, textContent);
        }

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

export { getPageRestaurants, getDetailRetaurant, changeStatusRestaurant };
