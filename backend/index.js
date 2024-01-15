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

  app.get('*',(req,res,next)=>{
    res.status(200).json({
      message:'bad request'
    })
  })
  

// middlwares
app.use("/api/v1/auth", userRoute);
app.use("/api/v1/loans", loanRoute);

app.listen(PORT, () => {
  console.log(`App is listening to port ${PORT}`);
});