const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/events/:eventId/comment', userController.postComment);

module.exports = router;
