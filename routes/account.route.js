// login.route.js
"use strict";
const express = require("express");
const router = express.Router();

const organizerController = require('../controllers/organizer.controller');
const adminController = require('../controllers/admin.controller');

router.get('/OrganizerEvents/signup', organizerController.renderSignUp);
router.post('/OrganizerEvents/signup', organizerController.signUp);
router.get('/OrganizerEvents/login', organizerController.renderLogin);
router.post('/OrganizerEvents/login', organizerController.login);
router.get("/OrganizerEvents/logout", organizerController.logout);
router.post('/Admin/signup', adminController.signUp);
router.post('/Admin/login', adminController.login);
router.get("/Admin/logout", adminController.logout);

module.exports = router;
