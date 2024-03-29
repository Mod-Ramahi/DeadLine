const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = require("./routes");
const compression = require("compression");
const morgan = require("morgan");
const cors = require('cors');
require("dotenv").config();

const app = express();
const port = process.env.PORT||4000;
app.use(cors());
app.use((req, res, next) => {
  // Enabling CORS
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization');
  next();
});
app.use(bodyParser.json());
app.use([
  compression(),
  express.json(),
  express.urlencoded({ extended: false }),
]);

app.use(morgan("dev"));
if (process.env.NODE_ENV === "development") {
}
// Connect to MongoDB
mongoose.connect("mongodb+srv://dbfreelancer:4Dt8qrkl1p2ZOsXt@freelancerdb.5jr23io.mongodb.net/deadlinedb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use("/api/v1", router);

app.use((req, res, next) => {
  res.status(404).json("bad request");
});
app.use((error, req, res, next) => {
  if (error.status) {
    res.status(error.status).json(error.message);
  } else {
    console.log(error)
    res.status(500).json("interval server error");
  }
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});