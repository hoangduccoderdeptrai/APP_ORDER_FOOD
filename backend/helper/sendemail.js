async function sendemail(emailOwner, textContent) {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: emailOwner,
            subject: "Thông báo từ hệ thống",
            text: textContent,
        });
    } catch (err) {
        // Notificate Error
        console.log(err.message);
    }
}

// Export module
export default sendemail;
