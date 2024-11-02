// Import router order
import orderItemsRoute from "./order.route.js";

// Import router comment
import commentRouter from "./comment.router.js";

// Import authentication middleware
import { authenticate } from "../../middleware/user/authentication.js";

function webInitRouterCustomer(app) {
    app.use("/customer/order", orderItemsRoute);

    app.use("/customer/comment", commentRouter);
}

export default webInitRouterCustomer;
