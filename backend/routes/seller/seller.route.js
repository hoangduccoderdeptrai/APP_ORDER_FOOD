// Import route
import menuItemRoute from "./menuItem.route.js";
import manageOderRoute from "./manageOrder.route.js";
import manageRestaurantRoute from "./manageRestaurant.routee.js";

// Import auhenticate and authorize middleware
import { authenticate, authorizeRoles } from "../../middleware/user/authentication.js";

function webInitRouterSeller(app) {
    app.use("/api/restaurant", authenticate, authorizeRoles("seller"));

    app.use("/api/restaurant", menuItemRoute);

    app.use("/api/restaurant/order", manageOderRoute);

    app.use("/api/restaurant/manage", manageRestaurantRoute);
}

export default webInitRouterSeller;
