const express = require("express");

const app = express();
const http = require("http").createServer(app);

const port = 5000;
const path = require("path");
const bodyParser = require("body-parser");
// const fs = require("fs");

// To handle ajax JSON
app.use(bodyParser.json());
// To handle basic html form
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "./public")));

app.get("/greeting", (req, res) => {
  const { userName } = req.query;

  res.send(`Greetings ${userName} !`);
});

app.post("/greeting", (req, res) => {
  const { userName } = req.body;

  res.send(`Greetings ${userName} !`);
});

http.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
