// Import Role model
import { Role } from "../../Model/role.model.js";

// Import searchHelper
import { search } from "../../helper/search.js";
import { pagination } from "../../helper/pagination.js";

// [GET] all role
const getRoles = async (req, res) => {
    try {
        // Find condittion
        let find = {};

        // Get title role when user search
        const objectSearch = search(req.query);

        // Check objectSearch has regex
        if (objectSearch.regex) {
            find["title"] = objectSearch.regex;
        }

        // Pagination
        const numberRoles = Role.countDocuments(find); // Count all role
        const objectPagination = pagination(req.query, numberRoles, {
            currentPage: 1,
            limit: 4,
        }); // Get objectPagination

        // Get Role
        const roles = await Role.find(find)
            .limit(objectPagination.limit)
            .skip(objectPagination.skip);

        // Return Json
        res.status(200).json({
            roles: roles,
            pagination: objectPagination,
            keySeach: objectSearch.keyword,
        });
    } catch (err) {
        // Notificate Error
        res.status(500).json({ msg: err.message });
    }
};

// [GET] detail role
const getDetailRole = async (req, res) => {
    try {
        // Get id of role
        const id = req.params.id;

        // Find role by id
        const role = await Role.find({ _id: id });

        // Return Json
        res.status(200).json({
            role: role,
        });
    } catch {
        // Notificate Error
        res.status(500).json({ msg: err.message });
    }
};

// [GET] page to create role
const getPageCreateRole = async (req, res) => {
    try {
        // Return Json
        res.status(200).json({
            pageTitle: "Create Role",
        });
    } catch (error) {
        // Notificate Error
        res.status(500).json({ msg: err.message });
    }
};

// [POST] create role
const createRole = async (req, res) => {
    try {
        // Get data role from request
        const newRole = req.body;

        // Create role
        const role = new Role({
            title: newRole.title,
            description: newRole.description,
        });

        // Save role
        await role.save();

        // Redirect
        res.status(200).json({
            msg: "Create role was successful",
        });
    } catch (error) {
        // Notificate Error
        res.status(500).json({ msg: err.message });
    }
};

// [GET] page to edit role
const getPageEditRole = async (req, res) => {
    try {
        // Get id role
        const id = req.params.id;

        // Get role by id
        const role = await Role.find({ _id: id });

        // Return Json
        res.status(200).json({
            role: role,
        });
    } catch (error) {
        // Notificate Error
        res.status(500).json({ msg: err.message });
    }
};

// [PATCH] edit role
const editRole = async (req, res) => {
    try {
        // Get role from form
        const newRole = req.body;

        // Get role id
        const id = req.params.id;

        // Find by id and update
        await Role.findByIdAndUpdate(
            { _id: id },
            {
                title: newRole.title,
                description: newRole.description,
            }
        );

        // Redirect
        res.status(200).json({
            msg: "Edit role was successful",
        });
    } catch (error) {
        // Notificate Error
        res.status(500).json({ msg: err.message });
    }
};

// [DELETE] delete forever role
const deleteRole = async (req, res) => {
    try {
        // Get id id
        const id = req.params.id;

        // Delte role
        await Role.deleteOne({ _id: id });

        // Redirect
        res.status(200).json({ msg: "Delete role was successful" });
    } catch (error) {
        // Notificate Error
        res.status(500).json({ msg: err.message });
    }
};

// [GET] page to custome authorization
const getPageAuthorization = async (req, res) => {
    try {
        // Get all role
        const roles = await Role.find({});

        // Object to store authorization for each role
        let arrAuthorization = [
            {
                nameAutorization: "restaurant",
                typeAuthorizations: ["view", "create", "edit", "delete"],
            },
            {
                nameAutorization: "food",
                typeAuthorizations: ["view", "create", "edit", "delete"],
            },
            {
                nameAutorization: "groupRole",
                typeAuthorizations: ["view", "create", "edit", "delete", "authorization"],
            },
            {
                nameAutorization: "account",
                typeAuthorizations: ["view", "create", "edit", "delete"],
            },
            {
                nameAutorization: "order",
                typeAuthorizations: ["view", "create", "edit", "delete"],
            },
        ];

        // Return Json
        res.status(200).json({
            roles: roles,
            listAuthorization: arrAuthorization,
        });
    } catch (error) {
        // Notificate Error
        res.status(500).json({ msg: err.message });
    }
};

// [PATCH] edit authorization role
const editAuthorization = async (req, res) => {
    try {
        // Get list authorization
        const listAuthorization = JSON.parse(req.body.permissions);

        // Loop through all list authorization by role
        listAuthorization.forEach(async (authorization) => {
            // Get role id and permissions corresponding
            const { id, ...newPermissions } = authorization;

            // Find by id and update
            await Role.findByIdAndUpdate(
                { _id: id },
                {
                    permissions: newPermissions,
                }
            );
        });

        // redirect
        res.status(200).json({ msg: "Edit authorization was successful" });
    } catch (error) {
        // Notificate Error
        res.status(500).json({ msg: err.message });
    }
};

export {
    getRoles,
    getDetailRole,
    getPageCreateRole,
    createRole,
    getPageEditRole,
    editRole,
    deleteRole,
    getPageAuthorization,
    editAuthorization,
};
