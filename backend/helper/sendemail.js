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

async function sendemail(emailOwner, textContent) {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: emailOwner,
            subject: "Thông báo từ hệ thống Yummy Order Food",
            text: textContent,
        });
    } catch (err) {
        // Notificate Error
        console.log(err.message);
    }
}

// Export module
export { sendemail };
