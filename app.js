const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

const PORT = config.get("port") || 5000;

app.use(bodyParser.json());
app.use('/api/recipes', require('./routes/api/recipes'));

async function start() {
  try {
    await mongoose.connect(config.get("mongoURI"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    app.listen(PORT, () => console.log(`App started on ${PORT}`));
  } catch (e) {
    console.log("Server error");
    process.exit(1);
  }
}

start();
