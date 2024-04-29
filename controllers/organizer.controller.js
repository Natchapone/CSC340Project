"use strict";
const organizerModel = require('../models/organizer.model');

async function renderSignUp(req, res) {
    res.render('orgSignUp', { error: null });
}

async function signUp(req, res) {
    const { email, password } = req.body;

    try {
        // Check if the email already exists in the database
        const existingOrganizer = await organizerModel.getOrganizerByEmail(email);
        if (existingOrganizer) {
            throw new Error('Email already exists');
        }

        const bannedOrganizer = await organizerModel.getBannedOrganizer(email);
        if (bannedOrganizer){
            throw new Error('Banned Organizer');
        }

        // Create a new organizer
        const newOrganizer = await organizerModel.createOrganizer(email, password);

        // Redirect to login page after successful sign-up
        res.redirect('/account/OrganizerEvents/login');
    } catch (error) {
        // Render sign-up page with error message
        res.render('orgSignUp', { error: error.message });
    }
}

async function renderLogin(req, res) {
    res.render('orgLogin', { error: null });
}

async function login(req, res) {
    const { email, password } = req.body;
    const organizer = await organizerModel.getOrganizerByEmail(email);

    if (!organizer || organizer.orgPassword !== password) {
        return res.render('orgLogin', { error: 'Invalid email or password' });
    }

    // Set session or token for authenticated user
    req.session.organizerId = organizer.orgId;
    res.redirect('/SpartanEvent/OrganizerEvents/' + organizer.orgId); // Redirect to Org event page
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
    renderLogin,
    login,
    logout,
    renderSignUp,
    signUp,
};
