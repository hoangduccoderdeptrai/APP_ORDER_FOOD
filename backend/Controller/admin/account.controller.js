// Import User (seller, admin, customer, shipper) model
import { Account } from "../../Model/account.model.js";

// Import restaurant model
import { Restaurant } from "../../Model/restaurant.model.js";

// Import searchHelper
import { search } from "../../helper/search.js";

// Import paginationHelper
import { pagination } from "../../helper/pagination.js";

// Import sendEmail helper function
import { sendemail } from "../../helper/sendemail.js";

// Get all account
const getPageAccount = async (req, res) => {
    try {
        // Find condition
        let find = {
            role: { $ne: "admin" },
        };

        // Get title role when user search
        const objectSearchName = search(req.query.name);
        const objectSearchRole = search(req.query.role);

        // Check objectSearch has regex
        if (role) {
            find = {
                $and: [{ role: { $ne: "admin" } }, { role: role }],
            };
        }
        if (objectSearchName.regex) {
            find.name = objectSearchName.regex;
        }

        // Pagination
        const numberAccounts = await Account.countDocuments(find); // Count all account
        const objectPagination = pagination(req.query, numberAccounts, {
            currentPage: 1,
            limit: 6,
        }); // Get objectPagiantion

        // Find all account and remove password_account and address, name_account
        const accounts = await Account.find(find)
            .select("-password_account -address -name_account")
            .limit(objectPagination.limit)
            .skip(objectPagination.skip);

        // Check account is not exist
        if (!accounts || accounts.length === 0) {
            return res.status(200).json({ msg: "Account not found" });
        }

        // Return Json
        res.status(200).json({
            accounts: accounts,
            objectPagination: objectPagination,
            role: objectSearchRole.keyword,
            name: objectSearchName.keyword,
        });
    } catch (err) {
        // Notificate Error
        res.status(500).json({ msg: err.message });
    }
};

// Get deltail account
const getDetailAccount = async (req, res) => {
    try {
        // Get id from params
        const id = req.params.id;

        // Find user by id and remove password_account
        const account = await Account.findById(id).select(
            "-password_account -address -name_account"
        );

        // Check account is null
        if (!account) {
            return res.status(400).json({ msg: "Account not found" });
        }

        if (account.role === "admin" && account._id.toString() !== req.user.userId.toString()) {
            return res.status(400).json({ msg: "You can't access this account" });
        }

        // Return Json
        res.status(200).json({
            account: account,
        });
    } catch (err) {
        // Notificate Error
        res.status(500).json({ msg: err.message });
    }
};

// Delete account
const deleteAccount = async (req, res) => {
    try {
        // Get id from params
        const id = req.params.id;

        // Get user by id
        const account = await Account.findById(id);

        // Check account is null
        if (!account) {
            return res.status(400).json({ msg: "Account not found" });
        }

        if (account.role === "admin") {
            return res.status(400).json({ msg: "You can't delete this account" });
        }

        // Delete user by id
        await Account.findByIdAndDelete(id);

        // Delete restaurant of user if user is seller
        await Restaurant.deleteOne({ ownerId: id });

        // Send email to user
        const textContent = `Chào ${account.name_account}, 
        bạn đã bị xóa tài khoản vì vi phạm cộng đồng Yummy Order Food. Nếu bạn không đồng ý, vui lòng liên hệ với chúng tôi thông qua số điện thoại ${process.env.PHONE} để được hỗ trợ.`;
        sendemail(account.email, textContent);

        // Return Json
        res.status(200).json({ msg: "User deleted successfully" });
    } catch (err) {
        // Notificate Error
        res.status(500).json({ msg: err.message });
    }
};

export { getPageAccount, getDetailAccount, deleteAccount };
