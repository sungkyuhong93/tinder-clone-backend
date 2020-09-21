const express = require("express");
const mongoose = require("mongoose");
const Cards = require("./dbCards.js");
const Cors = require("cors");

// app config
const app = express();
const port = process.env.PORT || 8001;
const connection_url =
  "mongodb+srv://sung123:sung123@cluster0.lvvak.mongodb.net/tinderdb?retryWrites=true&w=majority";

// middlewares
app.use(express.json());
app.use(Cors());

// db config
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

//api end points
app.get("/", (req, res) => res.status(200).send("Hello World"));

app.post("/tinder/card", (req, res) => {
  const dbCard = req.body;

  Cards.create(dbCard, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/tinder/cards", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));
