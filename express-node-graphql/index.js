require("dotenv").config();

const callAPI = require("./graphql");

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

app.get("/:id", async (req, res) => {
  const weather = await callAPI(req.params.id);

  res.json(weather);
});

app.get("/", async (req, res) => {
  const weather = await callAPI("Paris");

  res.json(weather);
});

http.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
