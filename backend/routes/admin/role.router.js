// Require express and create a router
import express from "express";
const roleRouter = express.Router();

// Import controller
import {
    getRoles,
    getDetailRole,
    getPageCreateRole,
    createRole,
    getPageEditRole,
    editRole,
    deleteRole,
    getPageAuthorization,
    editAuthorization,
} from "../../Controller/admin/role.controller.js";

// Get roles
roleRouter.get("/", getRoles);

// Get detail role
roleRouter.get("/detail/:id", getDetailRole);

// Get page create role
roleRouter.get("/create", getPageCreateRole);

// Post create role
roleRouter.post("/create", createRole);

// Get detail page edit role
roleRouter.get("/edit/:id", getPageEditRole);

// Patch edit role
roleRouter.patch("/edit/:id", editRole);

// Delete role
roleRouter.delete("/delete/:id", deleteRole);

// Get authorization's role page
roleRouter.get("/authorization", getPageAuthorization);

// Patch authorization' role page
roleRouter.patch("/authorization", editAuthorization);

export default roleRouter;
