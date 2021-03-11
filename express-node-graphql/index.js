require("dotenv").config();

const graphql = require("./graphql");

const express = require("express");

const app = express();
const http = require("http").createServer(app);

const port = process.env.PORT || 5000;
const path = require("path");
const bodyParser = require("body-parser");

// To handle ajax JSON
app.use(bodyParser.json());
// To handle basic html form
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

http.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
