// Import router role
import roleRouter from "./role.router.js";

// Import router restaurant
import restaurantRouter from "./restaurant.router.js";

function webInitRouterAdmin(app) {
    app.use("/admin/role", roleRouter);

    app.use("/admin/restaurant", restaurantRouter);
}

export default webInitRouterAdmin;
