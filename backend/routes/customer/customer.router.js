// Import route homePage
import homeCustomerRouter from "./homePage.router.js";

function webInitRouterCustomer(app) {
    app.use("/customer/home", homeCustomerRouter);
}

export default webInitRouterCustomer;
