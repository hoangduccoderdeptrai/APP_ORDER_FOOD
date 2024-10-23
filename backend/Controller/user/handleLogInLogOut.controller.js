// Import account model
import { Account } from "../../Model/account.model.js";

// Import role model
import { Role } from "../../Model/role.model.js";

// Import md5
import md5 from "md5";

// Import createToken helper function
import { createToken } from "../../helper/token.js";

// Import sendEmail helper function
import { sendemail } from "../../helper/sendemail.js";

// Login account
const signIn = async (req, res) => {
    try {
        // Get email or phone and password
        const accountSended = req.body.email || req.body.phone;
        const passwordSended = md5(req.body.password);

        // Find account by email or phone
        const account = await Account.findOne({
            $or: [{ email: accountSended }, { phone: accountSended }],
        });

        // Check account
        if (!account) {
            return res.status(400).json({ msg: "Account does not exist" });
        } else {
            // Compare password
            if (account.password_account === passwordSended) {
                // Create token
                const token = createToken(account);
                // Return Json
                return res
                    .status(200)
                    .json({ msg: "Login success", account: account, token: token });
            } else {
                return res.status(400).json({ msg: "Password is incorrect" });
            }
        }
    } catch (err) {
        // Return error message
        res.status(500).json({ msg: err.message });
    }
};

// Sign up account
const signUp = async (req, res) => {
    try {
        // Get account from form
        const infoAccount = req.body;

        // Check account exist
        const accounts = await Account.find({
            $or: [
                { email: infoAccount.email },
                { phone: infoAccount.phone },
                { name_account: infoAccount.name_account },
            ],
        });

        console.log(accounts);

        // array error
        const arrError = [];

        accounts.forEach((account) => {
            if (account.email === infoAccount.email) {
                arrError.push("Email has exist");
            }
            if (account.phone === infoAccount.phone) {
                arrError.push("Phone has exist");
            }
            if (account.name_account === infoAccount.name_account) {
                arrError.push("Name account has exist");
            }
        });

        if (arrError.length > 0) {
            return res.status(400).json({ msg: arrError });
        }

        // Get role
        const roleName = infoAccount.role_name;
        const role = await Role.findOne({ title: roleName });
        infoAccount.role_id = role._id;

        // Create account
        const newAccount = new Account({
            name: infoAccount.name,
            email: infoAccount.email,
            phone: infoAccount.phone,
            name_account: infoAccount.name_account,
            password_account: md5(infoAccount.password_account),
            address: infoAccount.address,
            role_id: infoAccount.role_id,
        });

        // Save account
        await newAccount.save();

        // Return Json.
        res.status(200).json({
            msg: "Create account was successful",
        });
    } catch (err) {
        // Notificate Error
        res.status(500).json({ msg: err.message });
    }
};

// Log out account
const signOut = async (req, res) => {
    try {
        // Return Json
        res.status(200).json({
            msg: "Log out success",
        });
    } catch (err) {
        // Notificate Error
        res.status(500).json({ msg: err.message });
    }
};

// Handle forgot password
const forgotPassword = async (req, res) => {
    try {
        // Get email/phone from form
        const accountSended = req.body.email || req.body.phone;

        // Find account by email or phone
        const account = await Account.findOne({
            $or: [{ email: accountSended }, { phone: accountSended }],
        });

        // Check account
        if (!account) {
            res.status(400).json({ msg: "Account does not exist" });
        } else {
            // Create new password
            const newPassword = Math.random().toString(36).slice(-8);

            console.log(newPassword);

            // Update password
            account.password_account = md5(newPassword);

            // Save account
            await account.save();

            // Send email
            const textContent = `Mật khẩu của bạn là: ${newPassword}, vui lòng đăng nhập và đổi mật khẩu ngay sau khi đăng nhập thành công để bảo mật tài khoản.`;
            sendemail(account.email, textContent);

            // Return Json
            res.status(200).json({ msg: "Reset password is successfully" });
        }
    } catch (err) {
        // Notificate Error
        res.status(500).json({ msg: err.message });
    }
};

// Change password
const changePassword = async (req, res) => {
    try {
        // account from authentication
        const accountId = req.body.payload.sub;

        // Get account
        const account = await Account.findById(accountId);

        // Get old password from form
        const oldPasswordSended = md5(req.body.oldPassword);

        // Get current password
        const currentPassword = account.password_account;

        // Check old password
        if (oldPasswordSended !== currentPassword) {
            res.status(400).json({ msg: "Old password is incorrect" });
        }

        // Get new password
        const passwordSended = md5(req.body.password);

        // Update password
        account.password_account = passwordSended;

        // Save account
        await account.save();

        // Return Json
        res.status(200).json({ msg: "Change password success" });
    } catch (err) {
        // Notificate Error
        res.status(500).json({ msg: err.message });
    }
};

// Export module
export { signIn, signUp, signOut, changePassword, forgotPassword };
