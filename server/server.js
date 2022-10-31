const express = require('express')
const cookieParser = require('cookie-parser');
const path = require("path");
const app = express()
const PORT = 3000
const cors = require("cors");
// Require Routers
const api = require("./routes/api.js");

const whitelist = [
  "http://localhost:3000",
  "http://www.localhost:3000",
  "http://www.localhost:8080",
  "http://localhost:8080"
];

const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      return callback(null, true);
    } else {
      callback(new Error(`origin ${origin} not allowed by CORS`));
    }
  },
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', api)

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../src/index.html"));
});

app.listen(PORT, ()=>console.log(`listening on port ${PORT}`))


module.exports = app;