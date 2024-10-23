// Import route homePage
import homeUserRouter from "./homePage.router.js";
import logInlogOutRouter from "./handleLogInLogOut.router.js";

function webInitRouterUser(app) {
    app.use("/user/home", homeUserRouter);

    app.use("/user/account", logInlogOutRouter);
}

export default webInitRouterUser;
