"use strict";
const express = require("express");
const router = express.Router();

const eventController = require("../controllers/event.controller");
const organizerController = require('../controllers/organizer.controller');
// set up routes to different requests/pages

router.post('/OrganizerEvents/login', organizerController.login);
router.get("/OrganizerEvents/:id", eventController.getOrgEvents);
router.post("/OrganizerEvents/:id/newEvent", eventController.createEvent);
router.delete("/OrganizerEvents/deleteEvent/:eventId", eventController.deleteEvent);
router.get("/OrganizerEvents/edit/:eventId", eventController.renderEditEventPage);
router.post("/OrganizerEvents/updateEvent/:eventId", eventController.updateEvent);
router.get('/event', eventController.event);
router.get('/event/search', eventController.eventSearch);
router.post('/event/flag', eventController.eventFlag)
router.get('/comment/search', eventController.commentSearch);
router.post('/comment/flag', eventController.commentFlag);
router.post('/comment/delete', eventController.commentDelete);
module.exports = router;