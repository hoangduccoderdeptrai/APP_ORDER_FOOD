// Import router role
import roleRouter from "./role.router.js";


// Import router restaurant
import restaurantRouter from "./restaurant.router.js";
import accountRouter from "./account.role.js";
function webInitRouterAdmin(app) {
    app.use("/admin/role", roleRouter);


    app.use("/admin/restaurant", restaurantRouter);

    app.use("/admin/account", accountRouter);



export default webInitRouterAdmin;
