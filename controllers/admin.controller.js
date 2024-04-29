"use strict";
const adminModel = require('../models/admin.model');

async function signUp(req, res) {
    const { email, password, authorization } = req.body;
    console.log(req.body);
    if (authorization !== "SpartanEvent305") {
        console.error("Authorization error");
        return res.status(403).send("Not Authorized"); 
    }

    try {
        const existingAdmin = await adminModel.getAdminByEmail(email);
        if (existingAdmin) {
            console.error("Signup error: Admin already exists");
            return res.status(409).send("Admin already exists");
        }

        const bannedAdmin = await adminModel.getBannedAdmin(email);
        if (bannedAdmin) {
            console.error("Signup error: Banned Admin");
            return res.status(409).send("Banned Admin");
        }

        // Create a new admin
        const newAdmin = await adminModel.createAdmin(email, password);

        // Redirect to login page after successful sign-up
        res.status(200).send("Register successful");
    } catch (error) {
        console.error("Error signing up:", error);
        if (error.name === "ValidationError") {
            return res.status(400).send("Invalid data provided"); 
        }
        res.status(500).send("Internal Server Error");
    }
}

async function login(req, res) {
    const { email, password } = req.body;

    const admin = await adminModel.getAdminByEmail(email);

    if (!admin || admin.adminPassword !== password) {
        console.error("Error login in: Not Admin or Wrong Password");
        return res.status(401).send("Not Admin or Wrong Password");
    }

    req.session.adminId = admin.adminId;

    res.status(200).send("Login successful");
}

async function logout(req, res) {
    // Clear the session
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
            res.status(500).send("Error logging out");
        } else {
            // Redirect the user to the login page after logging out
            res.redirect('/'); // Redirect to the root URL
        }
    });
}
module.exports = {
    login,
    logout,
    signUp,
};
