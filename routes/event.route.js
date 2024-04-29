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
router.get("/events", eventController.renderUserPage);
router.post("/user/event/flag",eventController.userEventFlag);
router.post("/user/comment/flag", eventController.userCommentFlag);
router.get("/Admin/flaggedEvents", eventController.adminFlaggedEvents);
router.get("/Admin/flaggedComments", eventController.adminFlaggedComments);
router.get("/userRSVPs", eventController.renderUserRSVPdEvents);
router.delete("/users/events/rsvp/:eventId", eventController.deleteRSVP);
router.post("/Admin/unflagEvent", eventController.unflagEvent);
router.post("/Admin/unflagComment", eventController.unflagComment);
router.post("/Admin/unflagUser", eventController.unflagUser);
router.get("/Admin/flaggedUsers", eventController.adminFlaggedUsers);
router.get("/Admin/flaggedOrganizers", eventController.adminFlaggedOrganizers);
router.post("/Admin/unflagOrganizer", eventController.adminUnflagOrganizer);



module.exports = router;