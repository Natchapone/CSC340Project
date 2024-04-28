const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/events/:eventId/comment', userController.postComment);
router.post('/events/:eventId/rsvp', userController.rsvp);

module.exports = router;
