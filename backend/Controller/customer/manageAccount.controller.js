// Import model
import { Account } from "../../Model/account.model.js";

// Import cloudinary
import { Cloudinary } from "../../config/cloundinaryCofig.js";

const getdetailAccount = async (req, res) => {
    try {
        // Get userId from request
        const userId = req.user.userId;

        // Find account by userId
        const account = await Account.findById(userId);

        // Check if account exists
        if (!account) {
            return res.status(404).json({ msg: "Account not found" });
        }

        // Return account
        return res.status(200).json({
            account: account,
        });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

const updateAccount = async (req, res) => {
    try {
        // Get userId from request
        const userId = req.user.userId;

        // Get information from request
        const { phone, address } = req.body;

        // Find account by userId
        const account = await Account.findById(userId);

        // Check if account exists
        if (!account) {
            return res.status(404).json({ msg: "Account not found" });
        }

        // Update account
        if (phone) {
            const regExp = /^(\+?[0-9]{1,3}[- ]?)?([0-9]{2,4}[- ]?)?[0-9]{3,4}[- ]?[0-9]{3,4}$/;
            let phoneValid = regExp.test(phone);
            if (!phoneValid) {
                return res.status(200).json({ msg: "Phone number is invalid" });
            }

            // Find another account with phone
            const anotherAccount = await Account.findOne({ phone: phone });

            // Check if another account exists
            if (anotherAccount && anotherAccount._id.toString() != userId) {
                console.log("Phone number is already in use");
                return res.status(200).json({ msg: "Phone number is already in use" });
            }
            account.phone = phone;
        }

        if (address) {
            account.address = address;
        }

        const avatar = req.file;
        if (avatar) {
            // Delete old avatar
            if (account.avatar && account.avatar.public_id) {
                await Cloudinary.uploader.destroy(account.avatar.public_id);
            }

            const result = await Cloudinary.uploader.upload(avatar.path, {
                folder: "Item_images",
            }); // Upload to cloudinary

            // Image source
            const newAvatar = {
                url: result.secure_url,
                public_id: result.public_id,
            };
            account.avatar = newAvatar;
        }

        // Save account
        await account.save();

        return res.status(200).json({ msg: "Account updated" });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

export { getdetailAccount, updateAccount };
