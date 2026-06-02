const express = require("express");
const mongoose = require("mongoose");

const dns=require("dns")

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])
const cors = require("cors");
require("dotenv").config();



const app = express();

app.use(cors());
app.use(express.json());
mongoose.connect(
 process.env.MONGO_URI
)
.then(()=>{
 console.log("Mongo Connected");
});
app.use(
 "/api/candidates",
 require("./routes/candidateRoutes")
);
app.listen(
 process.env.PORT,
 ()=>{
  console.log("Server Running");
 }
);
