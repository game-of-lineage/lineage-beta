const express = require('express')
const path = require("path");
const app = express()
const PORT = 3000
const cors = require("cors")
// Require Routers
const api = require("./routes/api.js");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', api)

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../src/index.html"));
});

app.listen(PORT, ()=>console.log(`listening on port ${PORT}`))

module.exports = app;