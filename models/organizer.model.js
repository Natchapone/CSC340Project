"use strict";
const db = require('./db-conn');
const path = require("path");

function getOrganizerByEmail(email) {
    return db.get('SELECT * FROM organizer WHERE orgEmail = ?', email);
}

function getBannedOrganizer(email){
    return db.get('SELECT * FROM banned WHERE bannedEmail = ?', email);
}

function createOrganizer(username, email, password) {
    return db.run('INSERT INTO organizer (orgEmail, orgPassword, flag) VALUES (?, ?, 0)', [email, password]);
}

module.exports = {
    getOrganizerByEmail,
    createOrganizer,
    getBannedOrganizer,

};
