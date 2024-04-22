"use strict";
const express = require("express");
const router = express.Router();

const eventController = require("../controllers/event.controller");
// set up routes to different requests/pages

router.get("/OrganizerEvents/:id", eventController.getOrgEvents);
router.post("/OrganizerEvents/:id/newEvent", eventController.createEvent);
router.delete("/OrganizerEvents/deleteEvent/:eventId", eventController.deleteEvent);
router.get("/OrganizerEvents/edit/:eventId", eventController.renderEditEventPage);
router.post("/OrganizerEvents/updateEvent/:eventId", eventController.updateEvent);

module.exports = router;