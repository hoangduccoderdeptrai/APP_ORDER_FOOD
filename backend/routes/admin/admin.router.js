// Import router role
import roleRouter from "./role.router.js";

function webInitRouterAdmin(app) {
    app.use("/admin", roleRouter);
}

export default webInitRouterAdmin;
