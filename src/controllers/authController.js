import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";

import users from "../models/userModel.js";


export default class AuthController {

    async addUser(req, res) {
        // return console.log(req.body);

        let { firstName, lastName, email, password } = req.body;

        console.log(`${firstName} ${lastName} ${email} ${password}`);

        // check if all the fields are filled
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // hash password
        password = await bcrypt.hash(password, 10);
        // add user
        try {
            // check if email is unique
            const user = await users.findOne({ where: { email } });
            if (user) {
                return res.status(400).json({ message: "Email already exists" });
            }

            const response = await users.create({ firstName, lastName, email, password });
            // check if user created
            console.log("\n\nresponse \n", response.dataValues);
            delete response.dataValues.password;
            response ? res.status(201).json({
                message: "User created successfully", data: response
            }) : res.status(400).json({ message: "User not created" });


        } catch (error) {
            console.log("Error adding user: ", error);
        }

    }
    async removeUser(req, res) {
        // remove user
        // after validate token middleware
        const { id, email } = req.tokenData;

        const response = await users.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!response) {
            return res.status(404).json({ message: "User not found" });
        }
        if (id !== response.id && email !== response.email) {
            return res.status(403).json({ message: "You are not authorized to delete this user" });
        }

        try {
            const response = await users.destroy({ where: { id: req.params.id } });
            // check if user deleted
            response ? res.status(200).json({
                message: "User deleted successfully"
            }) : res.status(400).json({ message: "User not deleted" });

        } catch (error) {
            console.log("Error removing user: ", error);
        }
    }
    async loginUser(req, res) {

        // return console.log(req.body);
        //    user login
        try {
            const user = await users.findOne({ where: { email: req.body.email } });
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }

            const isMatch = await bcrypt.compare(req.body.password, user.password);
            if (isMatch) {
                const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
                return res.status(200).json({
                    message: "User logged in successfully",
                    token,
                });
            }
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid credentials" });
            }

        } catch (error) {
            console.log("Error logging in user: ", error);
        }

    }
    async updateUser(req, res) {
        // update user

        // data from validate token middleware
        const { id, email } = req.tokenData;


        const response = await users.findOne({ where: { id: req.params.id } });
        if (!response) {
            return res.status(400).json({ message: "User not found" });
        }
        // check if user is authorized to update
        if (id !== response.id && email !== response.email) {
            return res.status(403).json({ message: "You are not authorized to update this user" });
        }

        // check if req body is filled
        if (!req.body.firstName || !req.body.lastName) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // check if data fields are changed
        if (req.body.firstName === response.firstName && req.body.lastName === response.lastName) {
            return res.status(400).json({ message: "No changes made" });
        }
        try {
            const response = await users.update({ ...req.body }, { where: { id: req.params.id } });
            // check if user updated
            response ? res.status(200).json({
                message: "User updated successfully"
            }) : res.status(400).json({ message: "User not updated" });


        } catch (error) {
            console.log("Error updating user: ", error);
        }





    }
    async verifyJWT(req, res, next) {
        // validate token
        const token = req.headers["jwt-token"];
        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.tokenData = decoded;
            if (decoded) {
                res.status(200).json({ message: "Token verified", status: true });
            } else {
                res.status(400).json({ message: 'Token not found', status: false });
            }
            // pass control to next middleware
            next();

        } catch (error) {
            console.log("Error verifying token: ", error);
            return res.status(401).json({ status: false, message: "Unauthorized" });
        }

    }
    async googleLogin(req, res) {
        // code
        // console.log(req.body);
        const { email, givenName, familyName } = req.body;
        let token = "";

        try {
            // using find or create
            const user = await users.findOrCreate({
                where: { email },
                defaults: {
                    firstName: givenName,
                    lastName: familyName
                }
            });


            token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

            // if all goes as per expected
            return res.status(200).json({ token, status: true });
        } catch (error) {
            console.log(error);
            return res.status(200).json({ message: error, status: false });
        }

    }
}