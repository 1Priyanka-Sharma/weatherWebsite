const express = require("express");
const app = express();

const path = require("path");
const logger = require("morgan");
const cors = require("cors");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// public static path-template engine
const static_path = path.join(__dirname + '/public');
app.use(express.static(static_path));
app.set('view engine', 'hbs');

app.use('/',require('./routes/news'))

app.set('views','./views')

app.listen(process.env.PORT || 3000);
module.exports = app;