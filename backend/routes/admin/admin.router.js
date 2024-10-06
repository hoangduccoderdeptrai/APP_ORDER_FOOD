// Import router role
import roleRouter from "./role.router.js";

// Import account router
import accountRouter from "./account.role.js";

function webInitRouterAdmin(app) {
    app.use("/admin/role", roleRouter);

    app.use("/admin/account", accountRouter);
}

export default webInitRouterAdmin;
