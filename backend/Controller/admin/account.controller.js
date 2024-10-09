// Import User (seller, admin, customer, shipper) model
import { Users } from "../../Model/user.model.js";

// Import Role model
import { Role } from "../../Model/role.model.js";

// Import restaurant model
import { Restaurant } from "../../Model/restaurant.model.js";

// Import InvoiceUser model
import { InvoiceUser } from "../../Model/invoiceUser.model.js";

// Import Order model
import { Order } from "../../Model/order.model.js";

// Import searchHelper
import search from "../../helper/search.js";

// Import paginationHelper
import pagination from "../../helper/pagination.js";

// Get all account
const getPageUsers = async (req, res) => {
    try {
        // Find condition
        let find = {};

        // Get title role when user search
        const objectSearch = search(req.query);

        // Check objectSearch has regex
        if (objectSearch.regex) {
            find["name"] = objectSearch.regex;
        }

        // Pagination
        const numberUsers = await Users.countDocuments(find); // Count all user
        const objectPagination = pagination(req.query, numberUsers, {
            currentPage: 1,
            limit: 4,
        }); // Get objectPagiantion

        // Find all user and remove email and password_account
        const users = await Users.find(find)
            .select("-email -password_account")
            .limit(objectPagination.limit)
            .skip(objectPagination.skip);

        // Return Json
        res.status(200).json({
            users: users,
            objectPagination: objectPagination,
            keyword: objectSearch.keyword,
        });
    } catch (error) {
        // Notificate Error
        res.status(500).json({ msg: err.message });
    }
};

// Get deltail user
const getDetailUser = async (req, res) => {
    try {
        // Get id from params
        const id = req.params.id;

        // Find user by id and remove password_account
        const user = await Users.findById(id).select("-password_account");

        // Find role by id
        const role = await Role.findById(user.role_id);

        // Return Json
        res.status(200).json({
            user: user,
            role: role,
        });
    } catch (error) {
        // Notificate Error
        res.status(500).json({ msg: err.message });
    }
};

// Delete user
const deleteUser = async (req, res) => {
    try {
        // Get id from params
        const id = req.params.id;

        // Delete user by id
        await Users.findByIdAndDelete(id);

        // Delete many order of user
        await Order.deleteMany({ userId: id });

        // Delete many invoice of user
        await InvoiceUser.deleteMany({ userId: id });

        // Delete restaurant of user
        await Restaurant.deleteOne({ ownerId: id });

        // Return Json
        res.status(200).json({ msg: "User deleted successfully" });
    } catch (error) {
        // Notificate Error
        res.status(500).json({ msg: err.message });
    }
};

export { getPageUsers, getDetailUser, deleteUser };
