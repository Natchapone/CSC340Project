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
  const sql = 'SELECT eventId, title, eventDate, '+
  'eventTime, location, imgPath, description, flag, orgId '+
  'FROM event ORDER BY eventId DESC;';
  return db.all(sql);
}

function eventSearch(eventId) {
  const sql = `SELECT eventId, title, eventDate, 
  eventTime, location, imgPath, description, flag, orgId 
  FROM event WHERE eventId= ?`;
  return db.get(sql, eventId);
}

function eventFlag (eventId){
  const query = `UPDATE organizer
            SET flag = 1
            WHERE orgId = (
			SELECT orgId
			FROM event
			WHERE eventId = ?);`;
  return db.run(query, [eventId]);
}

function commentSearch(eventId) {
  const sql = `SELECT comment.content, comment.userId, comment.eventId,
  user.userName 
  FROM comment, user 
  WHERE comment.eventId= ?
  AND comment.userId = user.userId;`;
  return db.all(sql, eventId);
}

function commentFlag (userId){
  const query = `UPDATE user
    SET flag = 1
    WHERE userId= ?;`;
  return db.run(query, [userId]);
}

function commentDelete (userId, eventId){
  const query = `DELETE FROM comment WHERE userId= ?
  AND eventId=?;`;
  return db.run(query, [userId, eventId]);
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

};