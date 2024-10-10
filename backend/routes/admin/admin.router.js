// Import router role
import roleRouter from "./role.router.js";

// Import router restaurant
import restaurantRouter from "./restaurant.router.js";

// Import router account
import accountRouter from "./account.router.js";

// Import router specialtyFood
import specialtyFoodRouter from "./specialtyFood.router.js";

function webInitRouterAdmin(app) {
    app.use("/admin/role", roleRouter);

    app.use("/admin/restaurant", restaurantRouter);

    app.use("/admin/account", accountRouter);

    app.use("/admin/specialty-food", specialtyFoodRouter);
}

export default webInitRouterAdmin;
