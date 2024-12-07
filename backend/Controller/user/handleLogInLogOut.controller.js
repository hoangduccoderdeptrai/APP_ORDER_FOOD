// Import account model
import { Account } from "../../Model/account.model.js";

// Import restaurant model
import { Restaurant } from "../../Model/restaurant.model.js";

// Import cloudinary
import { Cloudinary } from "../../config/cloundinaryCofig.js";

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
        if (!accountSended || !passwordSended) {
            return res.status(400).json({ msg: "Email/Phone and Password are required" });
        }

        // Find account by email or phone
        const account = await Account.findOne({
            $or: [{ email: accountSended }, { phone: accountSended }],
        });

        // Check account
        if (!account) {
            return res.status(200).json({ msg: "Account does not exist" });
        } else {
            // Compare password
            if (account.password_account === passwordSended) {
                // Create token
                const token = createToken(account);
                console.log(token);

                // Return Json
                return res
                    .status(200)
                    .cookie("token", token, { httpOnly: true, secure: true })
                    .json({
                        success: true,
                        msg: "Login success",
                        user: {
                            email: account.email,
                            role: account.role,
                            userId: account._id,
                            username: account.name,
                            address: account.address,
                            phone: account.phone,
                            avatar: account.avatar,
                        },
                    });
            } else {
                return res.status(200).json({ msg: "Password is incorrect" });
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
        const infoAccount = JSON.parse(req.body.infoAccount);

        // Check account exist
        const accounts = await Account.find({
            $or: [
                { email: infoAccount.email },
                { phone: infoAccount.phone },
                { name_account: infoAccount.name_account },
            ],
        });

        // array error
        const arrError = [];

        accounts.forEach((account) => {
            if (account.email === infoAccount.email) {
                arrError.push("Email account has exist");
            }
            if (account.phone === infoAccount.phone) {
                arrError.push("Phone account has exist");
            }
            if (account.name_account === infoAccount.name_account) {
                arrError.push("Name account account has exist");
            }
        });

        // Check error
        if (arrError.length > 0) {
            return res.status(200).json({ msg: arrError });
        }

        // Create account
        const newAccount = new Account({
            name: infoAccount.name,
            email: infoAccount.email,
            phone: infoAccount.phone,
            name_account: infoAccount.name_account,
            password_account: md5(infoAccount.password_account),
            address: infoAccount.address,
            role: infoAccount.role,
        });

        // Check role_name is seller
        if (infoAccount.role === "seller") {
            // Get email to find account
            const email = infoAccount.email;

            // Get inforrestaurant from form
            const infoRestaurant = JSON.parse(req.body.infoRestaurant);

            // Check infoRestaurant is empty
            if (Object.keys(infoRestaurant).length === 0) {
                return res.status(200).json({ msg: "Info restaurant is empty" });
            }

            // Check phone and name restaurant exist
            const restaurants = await Restaurant.find({
                $or: [{ phone: infoRestaurant.phone }, { name: infoRestaurant.name }],
            });

            // Loop to check error
            for (let restaurant of restaurants) {
                if (restaurant.phone === infoRestaurant.phone) {
                    arrError.push("Phone restaurant has exist");
                }
                if (restaurant.name === infoRestaurant.name) {
                    arrError.push("Name restaurant has exist");
                }
            }

            // Check error
            if (arrError.length > 0) {
                return res.status(200).json({ msg: arrError });
            }

            // Save image of restaurant to cloudinary
            const image_url = [];

            if (req.files) {
                // Get avatar restaurant
                const avatar = req.files["avatar"];
                const images = req.files["images"];

                // Merge array images
                const arrImages = [...avatar, ...images];

                // Loop to save image to cloudinary
                for (let image of arrImages) {
                    try {
                        // console.log('imaga',image)
                        const result = await Cloudinary.uploader.upload(image.path, {
                            // upload_preset: process.env.UPLOAD_PRESET,
                            folder: "Item_images",
                        });

                        // Image source
                        image_url.push({
                            url: result.secure_url,
                            public_id: result.public_id,
                        });
                    } catch (err) {
                        console.error("error uploading", err.message);
                    }
                }
            }

            // Save account
            await newAccount.save();

            // Find account by email
            const account = await Account.findOne({ email: email });
            const ownerId = account._id;

            // Create restaurant
            const newRestaurant = new Restaurant({
                ownerId: ownerId,
                name: infoRestaurant.name,
                address: infoRestaurant.address,
                phone: infoRestaurant.phone,
                time_open: infoRestaurant.time_open,
                time_close: infoRestaurant.time_close,
                description: infoRestaurant.description,
                imageUrl: image_url,
            });

            // Save restaurant
            await newRestaurant.save();

            // Return Json
            res.status(200).json({
                msg: "Create account and restaurant was successful",
            });
        } else {
            // Save account
            await newAccount.save();

            // Return Json.
            res.status(200).json({
                msg: "Create account was successful",
            });
        }
    } catch (err) {
        // Notificate Error
        res.status(500).json({ msg: err.message });
    }
};

// Log out account
const signOut = async (req, res) => {
    try {
        // Return Json
        res.status(200).clearCookie("token").json({
            success: true,
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
            res.status(200).json({ msg: "Account does not exist" });
        } else {
            // Create new password
            const newPassword = Math.random().toString(36).slice(-8);

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
        const accountId = req.user.userId;

        // Get account
        const account = await Account.findById(accountId);

        // Check account
        if (!account) {
            return res.status(404).json({ msg: "Account does not exist" });
        }

        // Get old password from form
        const oldPasswordSended = md5(req.body.oldPassword);

        // Get current password
        const currentPassword = account.password_account;

        // Check old password
        if (oldPasswordSended !== currentPassword) {
            return res.status(400).json({ msg: "Old password is incorrect" });
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
