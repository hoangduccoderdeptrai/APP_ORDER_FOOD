import express from "express";
import http from "http";
import { Server } from "socket.io";
import connect from "./DB_Mongoose/connect_BD.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import webInitRouterCustomer from "./routes/customer/customer.router.js";
import webInitRouterAdmin from "./routes/admin/admin.router.js";
import webInitRouterUser from "./routes/user/user.router.js";
import webInitRouterSeller from "./routes/seller/seller.route.js";
import "dotenv/config.js";
import { initSocket } from "./config/socket.js";
// Init server
const app = express();

// Middleware to handle data in request
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// let whileListAllow = ["https://vnueats.com", "http://localhost:5173"];
// let corsOptions = {
//     origin: function (origin, callback) {
//         if (!origin||whileListAllow.includes(origin)) {
//             callback(null, true);
//         } else {
//             callback(new Error("Not allowed by CORS"));
//         }
//     },
//     credentials: true,
// };
// app.use(cors(corsOptions));

app.use(
    cors({
        // origin: "http://localhost:5173",
        credentials: true,
    })
);

const server = http.createServer(app);
initSocket(server); //Initalize io

// Use API
webInitRouterSeller(app); // Seller
webInitRouterCustomer(app); // Customer
webInitRouterAdmin(app); // Admin
webInitRouterUser(app); // User

// Connect to DB
(async () => {
    try {
        await connect(process.env.URI);
        server.listen(3000, () => {
            console.log("server is listening");
        });
    } catch (err) {
        console.error("Failed to start the server:", err);
    }
})();
