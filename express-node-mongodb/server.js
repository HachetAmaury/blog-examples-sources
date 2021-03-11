const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");

let myEnv = dotenv.config();
dotenvExpand(myEnv);

const database = require("./database");

const express = require("express");

const app = express();
const http = require("http").createServer(app);

const port = process.env.PORT || 5000;
const path = require("path");
const bodyParser = require("body-parser");

console.log(process.env.DATABASE_URL);

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

const Todos = require("./TodoMangoose");

async function CRUD() {
  const todosAdded = await Todos.insertMany([
    { content: "Do the groceries" },
    { content: "Do the dishes" },
  ]);

  console.log(`${todosAdded.length} items added`);

  const todos = await Todos.find();

  console.log("Todos found : ");

  todos.map((todo) => {
    console.log(todo.content);
  });

  const removed = await Todos.deleteMany({ content: /Do/ });
  console.log(`${removed.deletedCount} items removed`);
}

CRUD();
