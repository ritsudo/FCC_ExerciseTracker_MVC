const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors')
require('dotenv').config()

const database = process.env.MONGO_URI;
mongoose
  .connect(database, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("# Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json());

app.use(cors())
app.use(express.static('public'))

app.use("/", require("./routes/routes"));


const listener = app.listen(process.env.PORT || 80, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
