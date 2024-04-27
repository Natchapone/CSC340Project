"use strict";
const db = require('./db-conn');
const path = require("path");

function getAdminByEmail(email) {
    return db.get('SELECT * FROM admin WHERE adminEmail = ?', email);
}

function createAdmin(email, password) {
    return db.run('INSERT INTO admin (adminEmail, adminPassword) VALUES (?, ?)', [email, password]);
}

module.exports = {
    getAdminByEmail,
    createAdmin,
};
