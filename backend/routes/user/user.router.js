// Import route
import homeUserRouter from "./homePage.router.js";
import logInlogOutRouter from "./handleLogInLogOut.router.js";
import searchPageRouter from "./searchPage.controller.router.js";
import detailPageRouter from "./detailPage.router.js";
function webInitRouterUser(app) {
    app.use("/user/home", homeUserRouter);

    app.use("/user/account", logInlogOutRouter);

    app.use("/user/search", searchPageRouter);

    app.use("/user/detail", detailPageRouter);
    
}

export default webInitRouterUser;

