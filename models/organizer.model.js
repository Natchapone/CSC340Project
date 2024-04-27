"use strict";
const db = require('./db-conn');
const path = require("path");

function getOrganizerByEmail(email) {
    return db.get('SELECT * FROM organizer WHERE orgEmail = ?', email);
}

function createOrganizer(username, email, password) {
    return db.run('INSERT INTO organizer (orgName, orgEmail, orgPassword, flag) VALUES (?, ?, ?, 0)', [username, email, password]);
}

module.exports = {
    getOrganizerByEmail,
    createOrganizer,
};
