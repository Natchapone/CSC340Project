"use strict";
const db = require('./db-conn');
const path = require("path");

function getUserByEmail(email) {
    return db.get('SELECT * FROM user WHERE userEmail = ?', email);
}

function getBannedUser(email) {
    return db.get('SELECT * FROM banned WHERE bannedEmail = ?', email);
}

function createUser(username, email, password) {
    return db.run('INSERT INTO user (userName, userEmail, userPassword, flag) VALUES (?, ?, ?, 0)', [username, email, password]);
}

async function addComment(userId, eventId, comment) {
    const sql = `INSERT INTO comment (content, userId, eventId, flag) VALUES (?, ?, ?, ?)`;
    await db.run(sql, comment, userId, eventId, 0);
}

function getRSVP(userId, eventId) {
    const sql = 'SELECT * FROM RSVP WHERE userId = ? AND eventId = ?';
    return db.get(sql, userId, eventId);
}

function createRSVP(userId, eventId) {
    const sql = 'INSERT INTO RSVP (userId, eventId) VALUES (?, ?)';
    return db.run(sql, userId, eventId);
}

module.exports = {
    getUserByEmail,
    createUser,
    addComment,
    getRSVP,
    createRSVP,
    getBannedUser,

};
