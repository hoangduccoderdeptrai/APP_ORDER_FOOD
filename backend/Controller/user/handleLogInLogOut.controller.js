// Import user model
import { Users } from "../../Model/user.model.js";

// Import role model
import { Role } from "../../Model/role.model.js";

// Import md5
import md5 from "md5";

// Import createToken helper function
import { createToken } from "../../helper/token.js";

// Import sendEmail helper function
import { sendemail } from "../../helper/sendemail.js";

// Login user
const signIn = async (req, res) => {
    try {
        // Get email or phone and password
        const account = req.body.email || req.body.phone;
        const password = md5(req.body.password);

        // Find user by email or phone
        const user = await Users.findOne({ $or: [{ email: account }, { phone: account }] });

        // Check user
        if (!user) {
            return res.status(400).json({ msg: "Account does not exist" });
        } else {
            // Compare password
            if (user.password_account === password) {
                // Create token
                const token = createToken(user);
                // Return Json
                return res.status(200).json({ msg: "Login success", user: user, token: token });
            } else {
                return res.status(400).json({ msg: "Password is incorrect" });
            }
        }
    } catch (err) {
        // Return error message
        res.status(500).json({ msg: err.message });
    }
};

// Get page sign up
const getPageSignUp = async (req, res) => {
    try {
        // Get all users in database
        const users = await Users.find({}).select("email phone name_account");

        // Get role
        const roles = await Role.find({}).select("title _id");

        // Return Json
        res.status(200).json({
            users: users,
            roles: roles,
        });
    } catch (error) {
        // Notificate Error
        res.status(500).json({ msg: err.message });
    }
};

// Sign up user
const signUp = async (req, res) => {
    try {
        // Get user from form
        const infoUser = req.body;

        // Create user
        const newUser = new Users({
            name: infoUser.name,
            email: infoUser.email,
            phone: infoUser.phone,
            name_account: infoUser.name_account,
            password_account: md5(infoUser.password_account),
            address: infoUser.address,
            role_id: infoUser.role_id,
        });

        // Save user
        await newUser.save();

        // Return Json.
        res.status(200).json({
            msg: "Create user was successful",
        });
    } catch (err) {
        // Notificate Error
        res.status(500).json({ msg: err.message });
    }
};

// Log out user
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
        const account = req.body.email || req.body.phone;

        // Find user by email or phone
        const user = await Users.findOne({ $or: [{ email: account }, { phone: account }] });

        // Check user
        if (!user) {
            res.status(400).json({ msg: "Account does not exist" });
        } else {
            // Create new password
            const newPassword = Math.random().toString(36).slice(-8);

            console.log(newPassword);

            // Update password
            user.password_account = md5(newPassword);

            // Save user
            await user.save();

            // Send email
            const textContent = `Mật khẩu của bạn là: ${newPassword}, vui lòng đăng nhập và đổi mật khẩu ngay sau khi đăng nhập thành công để bảo mật tài khoản.`;
            sendemail(user.email, textContent);

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
        // Get email/phone from form
        const account = req.body.email || req.body.phone;

        // Get new password
        const password = md5(req.body.password);

        // Find user by email or phone
        const user = await Users.findOne({ $or: [{ email: account }, { phone: account }] });

        // Check user
        if (!user) {
            res.status(400).json({ msg: "Account does not exist" });
        } else {
            // Update password
            user.password_account = password;

            // Save user
            await user.save();

            // Return Json
            res.status(200).json({ msg: "Change password success" });
        }
    } catch (err) {
        // Notificate Error
        res.status(500).json({ msg: err.message });
    }
};

// Export module
export { signIn, getPageSignUp, signUp, signOut, changePassword, forgotPassword };
