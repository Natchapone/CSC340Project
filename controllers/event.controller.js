"use strict";

const express = require("express");
const app = express();

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

module.exports = {
  //export the functions
  getOrgEvents,
  createEvent,
  deleteEvent,
  renderEditEventPage,
  updateEvent,

};
