"use strict";

const model = require("../models/event.model");
//controller functions to render content in ejs/html pages below

async function getOrgEvents(req, res) {
  try {
    const orgId = req.params.id;
    const events = await model.getEventsByOrgId(orgId);
    res.render("organizer", { orgId, events });// Pass orgId to the view
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function createEvent(req, res) {
  try {
    const eventData = req.body;
    console.log("eventData:", eventData);
    const orgId = req.params.id; // Retrieve orgId from URL parameters
    console.log("orgId:", orgId); // Log orgId to verify its value
    eventData.orgId = orgId;
    const result = await model.createEvent(eventData);
    res.redirect('/SpartanEvent/OrganizerEvents/' + orgId);
  } catch (error) {
    console.error("Error saving event:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function deleteEvent(req, res) {
  try {
    const eventId = req.params.eventId;
    await model.deleteEvent(eventId);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function renderEditEventPage(req, res) {
  try {
    const eventId = req.params.eventId;
    const event = await model.getEventById(eventId);
    res.render("edit-event", { event });
  } catch (error) {
    console.error("Error rendering edit event page:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function updateEvent(req, res) {
  try {
    const eventId = req.params.eventId;
    const eventData = req.body;
    await model.updateEvent(eventId, eventData);
    const orgId = req.body.orgId;
    res.redirect('/SpartanEvent/OrganizerEvents/' + orgId);
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).send("Internal Server Error");
  }
}
async function event(req, res) {
  try {
    const events = await model.event();
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function eventSearch(req, res) {
  try {
    const eventId = req.headers.eventid;
    const events = await model.eventSearch(eventId);
    res.json(events);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function eventFlag(req, res) {
  try {
    const eventId = req.body.eventId;
    await model.eventFlag(eventId);
  } catch (error) {
    console.error("Error flagging event:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function commentSearch(req, res) {
  try {
    const eventId = req.headers.eventid;
    const comments = await model.commentSearch(eventId);
    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function commentFlag(req, res) {
  try {
    const userId = req.body.userId;
    await model.commentFlag(userId);
  } catch (error) {
    console.error("Error flagging event:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function commentDelete(req, res) {
  try {
    const commentId = req.body.commentId;
    await model.commentDelete(commentId);
  } catch (error) {
    console.error("Error flagging event:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function renderUserPage(req, res) {
  try {
    const events = await model.getEventsWithComments();
    res.render("user", { events });
  } catch (error) {
    console.error("Error rendering user page:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function userEventFlag(req, res) {
  try {
    const eventId = req.body.eventId;
    await model.userEventFlag(eventId);
  } catch (error) {
    console.error("Error flagging event:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function userCommentFlag(req, res) {
  try {
    const commentId = req.body.commentId;
    await model.userCommentFlag(commentId);
  } catch (error) {
    console.error("Error flagging event:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function adminFlaggedEvents(req, res) {
  try {
    const events = await model.adminFlaggedEvents();
    res.json(events);
  } catch (error) {
    console.error("Error fetching flagged events:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function adminFlaggedComments (req, res) {
  try {
    const comments = await model.adminFlaggedComments();
    res.json(comments);
  } catch (error) {
    console.error("Error fetching flagged comments:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function renderUserRSVPdEvents(req, res) {
  try {
    const userId = req.session.userId;
    const rsvpEvents = await model.getRSVPdEventsWithComments(userId);

    res.render("userRSVPs", { rsvpEvents, userId });
  } catch (error) {
    console.error("Error rendering user RSVP'd events page:", error);
    res.status(500).send("Internal Server Error");
  }
}
async function deleteRSVP(req, res) {
  try {
    const { userId, eventId } = req.body;
    await model.deleteRSVP(userId, eventId);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error deleting RSVP:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function unflagEvent(req, res) {
  try {
    const eventId = req.body.eventId;
    await model.unflagEvent(eventId);
  } catch (error) {
    console.error("Error unflagging event:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function unflagComment (req, res) {
  try {
    const commentId = req.body.commentId;
    await model.unflagComment(commentId);
  } catch (error) {
    console.error("Error unflagging comment:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function unflagUser(req, res) {
  try {
    const userId = req.body.userId;
    await model.unflagUser(userId);
  } catch (error) {
    console.error("Error flagging event:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function adminFlaggedUsers(req, res) {
  try {
    const users = await model.adminFlaggedUsers();
    res.json(users);
  } catch (error) {
    console.error("Error fetching flagged users:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function adminFlaggedOrganizers(req, res) {
  try {
    const organizers = await model.adminFlaggedOrganizers();
    res.json(organizers);
  } catch (error) {
    console.error("Error fetching flagged organizers:", error);
    res.status(500).send("Internal Server Error");
  }
}

async function adminUnflagOrganizer(req, res) {
  try {
    const orgId = req.body.orgId;
    await model.adminUnflagOrganizer(orgId);
  } catch (error) {
    console.error("Error unflagging organizer:", error);
    res.status(500).send("Internal Server Error");
  }
}


module.exports = {
  //export the functions
  getOrgEvents,
  createEvent,
  deleteEvent,
  renderEditEventPage,
  updateEvent,
  event,
  eventSearch,
  eventFlag,
  commentSearch,
  commentFlag,
  commentDelete,
  renderUserPage,
  userEventFlag,
  userCommentFlag,
  adminFlaggedEvents,
  adminFlaggedComments,
  renderUserRSVPdEvents,
  deleteRSVP,
  unflagEvent,
  unflagComment,
  unflagUser,
  adminFlaggedUsers,
  adminFlaggedOrganizers,
  adminUnflagOrganizer,
};
