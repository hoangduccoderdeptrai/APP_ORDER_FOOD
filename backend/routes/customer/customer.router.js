// Import router order
import orderItemsRoute from "./order.router.js";

// Import router comment
import commentRouter from "./comment.router.js";

// Import router checkingOrder
import checkingOrderRoute from "./checkingOrder.router.js";

// Import router manageAccount
import manageAccountRoute from "./manageAccount.router.js";

// Import authentication middleware
import { authenticate, authorizeRoles } from "../../middleware/user/authentication.js";

function webInitRouterCustomer(app) {
    // Middleware authentication
    app.use("/customer", authenticate, authorizeRoles("customer", "seller", "admin"));

    app.use("/customer/order", orderItemsRoute);

    app.use("/customer/comment", commentRouter);

    app.use("/customer/checkingOrder", checkingOrderRoute);

    app.use("/customer/manageAccount", manageAccountRoute);
}

export default webInitRouterCustomer;
