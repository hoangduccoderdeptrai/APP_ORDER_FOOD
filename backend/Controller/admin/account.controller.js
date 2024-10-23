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
import { search } from "../../helper/search.js";

// Import paginationHelper
import { pagination } from "../../helper/pagination.js";

// Import sendEmail helper function
import { sendemail } from "../../helper/sendemail.js";

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
            .select("-password_account")
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

        // Get user by id
        const user = await Users.findById(id);

        // Delete user by id
        await Users.findByIdAndDelete(id);

        // Delete restaurant of user if user is seller
        await Restaurant.deleteOne({ ownerId: id });

        // Send email to user
        const textContent = `Chào ${user.name_account}, 
        bạn đã bị xóa tài khoản vì vi phạm cộng đồng Yummy Order Food. Nếu bạn không đồng ý, vui lòng liên hệ với chúng tôi thông qua số điện thoại ${process.env.PHONE} để được hỗ trợ.`;
        sendemail(user.email, textContent);

        // Return Json
        res.status(200).json({ msg: "User deleted successfully" });
    } catch (error) {
        // Notificate Error
        res.status(500).json({ msg: err.message });
    }
};

export { getPageUsers, getDetailUser, deleteUser };
