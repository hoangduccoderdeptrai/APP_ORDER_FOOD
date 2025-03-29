// Import router restaurant
import restaurantRouter from "./restaurant.router.js";

// Import router account
import accountRouter from "./account.router.js";

// Import router specialtyFood
import specialtyFoodRouter from "./specialtyFood.router.js";
import blogsRouter from "./blogs.router.js"
// Import middleware authentication
import { authenticate, authorizeRoles } from "../../middleware/user/authentication.js";

function webInitRouterAdmin(app) {
    // Middleware authentication
    app.use("/admin/api",blogsRouter)
    app.use("/admin", authenticate, authorizeRoles("admin"));

    app.use("/admin/restaurant", restaurantRouter);

    app.use("/admin/account", accountRouter);

    app.use("/admin/specialty-food", specialtyFoodRouter);
    
}

export default webInitRouterAdmin;
