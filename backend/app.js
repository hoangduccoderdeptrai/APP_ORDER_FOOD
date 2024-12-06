import express from "express";
import connect from "./DB_Mongoose/connect_BD.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import webInitRouterCustomer from "./routes/customer/customer.router.js";
import webInitRouterAdmin from "./routes/admin/admin.router.js";
import webInitRouterUser from "./routes/user/user.router.js";
import webInitRouterSeller from "./routes/seller/seller.route.js";
import "dotenv/config.js";

function run() {
    // Init server
    const app = express();

    // Middleware to handle data in request
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static("public"));
    app.use(
        cors({
            origin: "http://localhost:5173",
            credentials: true,
        })
    );

    // Use API
    webInitRouterSeller(app); // Seller
    webInitRouterCustomer(app); // Customer
    webInitRouterAdmin(app); // Admin
    webInitRouterUser(app); // User

    // Init port
    app.listen("3000", () => {
        console.log("server is listening");
    });
}

// Connect to DB
(async () => {
    await connect(process.env.URI);
    run();
})();
