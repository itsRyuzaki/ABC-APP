const fs = require("fs/promises");

const bodyParser = require("body-parser");
const express = require("express");

const app = express();

app.use(bodyParser.json());
app.use(express.static("backend/public"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/mobiles", async (req, res) => {
  const meals = await fs.readFile("backend/data/available-meals.json", "utf8");
  res.json(JSON.parse(meals));
});

app.get("/computers", async (req, res) => {
  const meals = await fs.readFile("backend/data/orders.json", "utf8");
  res.json(JSON.parse(meals));
});

app.use((req, res) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: "Not found" });
});

app.listen(3000);
