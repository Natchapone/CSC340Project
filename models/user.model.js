"use strict";
const db = require('./db-conn');
const path = require("path");

function getUserByEmail(email) {
    return db.get('SELECT * FROM user WHERE userEmail = ?', email);
}

function createUser(username, email, password) {
    return db.run('INSERT INTO user (userName, userEmail, userPassword, flag) VALUES (?, ?, ?, 0)', [username, email, password]);
}

async function addComment(userId, eventId, comment) {
    const sql = `INSERT INTO comment (content, userId, eventId, flag) VALUES (?, ?, ?, ?)`;
    await db.run(sql, comment, userId, eventId, 0);
}

module.exports = {
    getUserByEmail,
    createUser,
    addComment,
};
