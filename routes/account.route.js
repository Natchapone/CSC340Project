// login.route.js
"use strict";
const express = require("express");
const router = express.Router();

const organizerController = require('../controllers/organizer.controller');

router.get('/OrganizerEvents/signup', organizerController.renderSignUp);
router.post('/OrganizerEvents/signup', organizerController.signUp);
router.get('/OrganizerEvents/login', organizerController.renderLogin);
router.post('/OrganizerEvents/login', organizerController.login);
router.get("/OrganizerEvents/logout", organizerController.logout);

module.exports = router;
