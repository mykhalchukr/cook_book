const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

const PORT = config.get("port") || 5000;

app.use(bodyParser.json());
app.use("/api/recipes", require("./routes/api/recipes"));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

async function start() {
  try {
    await mongoose
      .connect(config.get("mongoURI"), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
      })
      .then(() => console.log("MongoDB Connected..."))
      .catch((err) => console.log("Error, DB not connected", err));

    app.listen(PORT, () => console.log(`App started on ${PORT}`));
  } catch (e) {
    console.log("Server error");
    process.exit(1);
  }
}

start();
