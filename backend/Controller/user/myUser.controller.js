import { Users } from "../Model/user.model.js";
const createCurrentUser = async (req, res) => {
    try {
        const { auth0Id } = req.body;
        const user = await Users.findOne({ auth0Id });
        console.log(user, "hoc lop hai ");
        if (user) {
            res.status(201).json({ msg: "User has been existed" });
            return;
        }
        // const newUser =await Users.create(req.body)
        if (user === null || user == undefined) {
            const newUser = new Users(req.body);
            await newUser.save();
            res.status(201).json(newUser);
            return;
        }
        res.status(304).send("failed created user");
    } catch (err) {
        console.log(err.message, "nguoi dan ong di ben em day phai");
        res.status(500).json({ message: "Error creating user" });
    }
};

export const MyUserController = { createCurrentUser };
