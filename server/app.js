require('dotenv').config();

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const schema = require('./database/schema');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const auth = require("./routes/auth");

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    key: "userId",
    saveUninitialized: false,
    secret: process.env.SESSIONSECRET,
    cookie: { maxAge: oneDay },
    resave: false 
}));
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
  }));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;

app.use("/api/auth",auth);


app.listen(port, () => console.log(`Listening on port ${port}..`));