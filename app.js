"use strict";
const express = require("express");
const app = express();
const session = require("express-session");
const path = require("path");
const bodyParser = require('body-parser');

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize express-session
app.use(session({ secret: 'your-secret-key', resave: false, saveUninitialized: false }));

// Set up view engine and static files
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
const eventRouter = require("./routes/event.route");
const account = require("./routes/account.route");
const users = require("./routes/user.route");

app.use("/SpartanEvent", eventRouter);
app.use("/account", account);
app.use("/users", users);

// route to landing page
app.get("/", (req, res) => {
    res.render("index", { title: 'Login' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log("App listening at http://localhost:" + PORT);
});