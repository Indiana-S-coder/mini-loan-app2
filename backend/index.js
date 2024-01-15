const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const userRoute = require("./routes/userRoute.js");
const loanRoute = require( "./routes/loanRoute.js");

const app = express();
app.use(cors());
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const CONNECTION_URL = process.env.MONGO_URL;

// Connect to MongoDB
mongoose
  .connect(CONNECTION_URL)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error(err));

// for production
if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.use(express.static(path.resolve(__dirname, 'client', 'build')));
  app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'),function (err) {
          if(err) {
              res.status(500).send(err)
          }
      });
  })
}

// middlwares
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/loans", loanRoute);

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});