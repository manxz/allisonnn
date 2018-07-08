"use strict";

const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const server = require("http").Server(app);
const router = express.Router();
const cookieParser = require("cookie-parser");
const path = require("path");
const serveIndex = require("serve-index");

const WEB_SERVER_PORT = 8080;

app.use(cors());
app.use("/public", express.static(__dirname + "/public"));
app.use(cookieParser());

app.use("/", router);

// If we choose to publish the web app, this is where we would serve it
// router.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname + "/public/index.html"));
// });

app.use(express.static(__dirname + "/"));
app.use("/playlist", serveIndex(__dirname + "/music"));

// TODO: add monetizer here
app.get("/audio", (req, res) => {
  const { id } = req.query;
  const file = __dirname + "/audio/" + id;

  fs.exists(file, exists => {
    if (exists) {
      const rstream = fs.createReadStream(file);
      rstream.pipe(res);
    } else {
      res.send("Its a 404");
      res.end();
    }
  });
});

server.listen(WEB_SERVER_PORT, () => {
  console.log("App listening on port " + WEB_SERVER_PORT);
});
