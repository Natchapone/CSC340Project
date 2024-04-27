"use strict";
const organizerModel = require('../models/admin.model');

async function signUp(req, res) {
    const { email, password, authorization } = req.body;
    if (authorization !== "SpartanEvent305"){
        console.error("Error signing up:", error);
        res.status(500).send("Not Authorized");
    }

    try {
        const existingAdmin = await adminModel.getAdminByEmail(email);
        if (existingAdmin) {
            throw new Error('Email already exists');
        }

        // Create a new organizer
        const newAdmin = await adminModel.createAdmin(email, password);

        // Redirect to login page after successful sign-up
        res.redirect('/admin-login.html');
    } catch (error) {
        // Render sign-up page with error message
        console.error("Error signing up:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function login(req, res) {
    const { email, password } = req.body;
    const admin = await adminModel.getAdminByEmail(email);

    if (!admin || admin.adminPassword !== password) {
        throw new Error('Invalid Request: No admin or password wrong');
    }

    // Set session or token for authenticated user
    req.session.adminId = admin.adminId;
    res.redirect('/adminEvent.html'); // Redirect to Org event page
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
