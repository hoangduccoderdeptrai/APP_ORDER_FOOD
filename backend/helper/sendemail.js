async function sendemail(emailOwner, textContent, transporter) {
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
