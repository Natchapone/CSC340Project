"use strict";
const userModel = require('../models/user.model');

async function renderSignUp(req, res) {
    res.render('userSignUp', { error: null });
}

async function signUp(req, res) {
    const { username, email, password } = req.body;

    try {
        // Check if the email already exists in the database
        const existingUser = await userModel.getUserByEmail(email);
        if (existingUser) {
            throw new Error('Email already exists');
        }

        // Create a new user
        const newUser = await userModel.createUser(username, email, password);

        // Redirect to login page after successful sign-up
        res.redirect('/account/user/login');
    } catch (error) {
        // Render sign-up page with error message
        res.render('userSignUp', { error: error.message });
    }
}

async function renderLogin(req, res) {
    res.render('userLogin', { error: null });
}

async function login(req, res) {
    const { email, password } = req.body;
    const user = await userModel.getUserByEmail(email);

    if (!user || user.userPassword !== password) {
        return res.render('userLogin', { error: 'Invalid email or password' });
    }

    req.session.userId = user.userId;
    res.redirect('/SpartanEvent/events'); // Redirect to user events page
}

async function logout(req, res) {
    // Clear the session
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
            res.status(500).send("Error logging out");
        } else {
            res.redirect('/'); // Redirect to landing page
        }
    });
}

async function postComment(req, res) {
    try {
        const userId = req.session.userId;
        const eventId = req.params.eventId;
        const { comment } = req.body;

        await userModel.addComment(userId, eventId, comment);

        res.redirect('/SpartanEvent/events');
    } catch (error) {
        console.error("Error posting comment:", error);
        res.status(500).send("Error posting comment");
    }
}

async function rsvp(req, res) {
    try {
        const userId = req.session.userId;
        const eventId = req.params.eventId;

        const existingRSVP = await userModel.getRSVP(userId, eventId);

        if (existingRSVP) {
            res.status(400).send('You have already RSVP\'d for this event.');
        } else {
            await userModel.createRSVP(userId, eventId);
            res.redirect('/SpartanEvent/events');
        }
    } catch (error) {
        console.error("Error handling RSVP:", error);
        res.status(500).send("Error handling RSVP");
    }
}


module.exports = {
    renderLogin,
    login,
    logout,
    renderSignUp,
    signUp,
    postComment,
    rsvp,
};
