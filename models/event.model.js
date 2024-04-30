"use strict";
const db = require("./db-conn");
const path = require("path");

// model functions to make queries to the db

function getEventsByOrgId(orgId) {
  const sql = "SELECT * FROM event WHERE orgId = ?";
  return db.all(sql, orgId);
}

function createEvent(eventData) {
  const { title, eventDate, eventTime, location, imgPath, description, orgId } = eventData;
  const sql = "INSERT INTO event (title, eventDate, eventTime, location, imgPath, description, orgId, flag) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  return db.run(sql, title, eventDate, eventTime, location, imgPath, description, orgId, 0);
}

function deleteEvent(eventId) {
  const sql = "DELETE FROM event WHERE eventId = ?";
  return db.run(sql, eventId);
}

async function getEventById(eventId) {
  const sql = "SELECT * FROM event WHERE eventId = ?";
  return db.get(sql, eventId);
}
async function updateEvent(eventId, eventData) {
  const { title, eventDate, eventTime, location, imgPath, description } = eventData;
  const sql = "UPDATE event SET title = ?, eventDate = ?, eventTime = ?, location = ?, imgPath = ?, description = ? WHERE eventId = ?";
  return db.run(sql, title, eventDate, eventTime, location, imgPath, description, eventId);
}

function event() {
  const sql = 'SELECT eventId, title, eventDate, ' +
    'eventTime, location, imgPath, description, flag, orgId ' +
    'FROM event ORDER BY eventId DESC;';
  return db.all(sql);
}

function eventSearch(eventId) {
  const sql = `SELECT eventId, title, eventDate, 
  eventTime, location, imgPath, description, flag, orgId 
  FROM event WHERE eventId= ?`;
  return db.get(sql, eventId);
}

function eventFlag(eventId) {
  const query = `UPDATE organizer
            SET flag = 1
            WHERE orgId = (
			SELECT orgId
			FROM event
			WHERE eventId = ?);`;
  return db.run(query, [eventId]);
}

function commentSearch(eventId) {
  const sql = `SELECT comment.content, comment.userId, comment.eventId, comment.commentId, 
  user.userName 
  FROM comment, user 
  WHERE comment.eventId= ?
  AND comment.userId = user.userId;`;
  return db.all(sql, eventId);
}

function commentFlag(userId) {
  const query = `UPDATE user
    SET flag = 1
    WHERE userId= ?;`;
  return db.run(query, [userId]);
}

function commentDelete(commentId) {
  const query = `DELETE FROM comment WHERE commentId= ?;`;
  return db.run(query, [commentId]);
}

function getEventsWithComments() {
  const sql = `
      SELECT e.eventId, e.title, e.eventDate, e.eventTime, e.location, e.imgPath, e.description, c.content AS commentContent, u.userName AS commenterName,
      c.commentId
      FROM event e
      LEFT JOIN comment c ON e.eventId = c.eventId
      LEFT JOIN user u ON c.userId = u.userId
      ORDER BY e.eventId, c.commentId ASC;`;

  const events = {};
  const rows = db.all(sql);

  rows.forEach(row => {
    const eventId = row.eventId;
    if (!events[eventId]) {
      events[eventId] = {
        eventId: eventId,
        title: row.title,
        eventDate: row.eventDate,
        eventTime: row.eventTime,
        location: row.location,
        imgPath: row.imgPath,
        description: row.description,
        comments: []
      };
    }
    if (row.commentContent) {
      events[eventId].comments.push({
        content: row.commentContent,
        commenterName: row.commenterName,
        commentId: row.commentId
      });
    }
  });

  return Object.values(events);
}

function userEventFlag(eventId) {
  const query = `UPDATE event
    SET flag = 1
    WHERE eventId= ?;`;
  return db.run(query, [eventId]);
}

function userCommentFlag(commentId) {
  const query = `UPDATE comment
    SET flag = 1
    WHERE commentId= ?;`;
  return db.run(query, [commentId]);
}

function adminFlaggedEvents() {
  const sql = `SELECT *
  FROM event 
  WHERE flag= 1;`;
  return db.all(sql);
}

function adminFlaggedComments() {
  const sql = `SELECT comment.userId, comment.eventId, comment.content, comment.commentId,
  user.userName
  FROM comment, user 
  WHERE comment.flag= 1
  AND comment.userId= user.userId;`;
  return db.all(sql);
}


function getRSVPdEventsWithComments(userId) {
  const sql = `
    SELECT e.eventId, e.title, e.eventDate, e.eventTime, e.location, e.imgPath, e.description, c.content AS commentContent, u.userName AS commenterName
    FROM event e
    INNER JOIN RSVP r ON e.eventId = r.eventId
    LEFT JOIN comment c ON e.eventId = c.eventId
    LEFT JOIN user u ON c.userId = u.userId
    WHERE r.userId = ?
    ORDER BY e.eventId, c.userId;`;

  const events = {};
  const rows = db.all(sql, userId);

  rows.forEach(row => {
    const eventId = row.eventId;
    if (!events[eventId]) {
      events[eventId] = {
        eventId: eventId,
        title: row.title,
        eventDate: row.eventDate,
        eventTime: row.eventTime,
        location: row.location,
        imgPath: row.imgPath,
        description: row.description,
        comments: []
      };
    }
    if (row.commentContent) {
      events[eventId].comments.push({
        content: row.commentContent,
        commenterName: row.commenterName
      });
    }
  });

  return Object.values(events);
}

async function deleteRSVP(userId, eventId) {
  const sql = "DELETE FROM RSVP WHERE userId = ? AND eventId = ?";
  return db.run(sql, userId, eventId);
}

function unflagEvent(eventId) {
  const query = `UPDATE event
    SET flag = 0
    WHERE eventId= ?;`;
  return db.run(query, [eventId]);
}

function unflagComment (commentId) {
  const query = `UPDATE comment
    SET flag = 0
    WHERE commentId= ?;`;
  return db.run(query, [commentId]);
}

function unflagUser (userId) {
  const query = `UPDATE user
    SET flag = 0
    WHERE userId= ?;`;
  return db.run(query, [userId]);
}

function adminFlaggedUsers() {
  const sql = `SELECT *
  FROM user 
  WHERE flag= 1;`;
  return db.all(sql);
}

function adminFlaggedOrganizers() {
  const sql = `SELECT *
  FROM organizer 
  WHERE flag= 1;`;
  return db.all(sql);
}

function adminUnflagOrganizer (orgId) {
  const query = `UPDATE organizer
    SET flag = 0
    WHERE orgId= ?;`;
  return db.run(query, [orgId]);
}

function adminDeleteUser (userId) {
  const sql = "DELETE FROM user WHERE userId = ?";
  return db.run(sql, userId);
}

function adminDeleteOrganizer(orgId) {
  const sql = "DELETE FROM organizer WHERE orgId = ?";
  return db.run(sql, orgId);
}

module.exports = {
  // export the functions
  getEventsByOrgId,
  createEvent,
  deleteEvent,
  getEventById,
  updateEvent,
  event,
  eventSearch,
  eventFlag,
  commentSearch,
  commentFlag,
  commentDelete,
  getEventsWithComments,
  userEventFlag,
  userCommentFlag,
  adminFlaggedEvents,
  adminFlaggedComments,
  unflagEvent,
  unflagComment,
  unflagUser,
  adminFlaggedUsers,
  adminFlaggedOrganizers,
  adminUnflagOrganizer,
  adminDeleteUser,
  adminDeleteOrganizer,




  getRSVPdEventsWithComments,
  deleteRSVP,
};