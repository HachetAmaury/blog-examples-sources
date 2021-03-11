// .server.js
require("dotenv").config();

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

app.post("/urlShortner", (req, res) => {
  console.log(req.body);
  const { fullUrl } = req.body;

  res.json({ shortUrl: "", fullUrl });
});

app.use(express.static(path.join(__dirname, "./public")));

http.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});
