const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/users");
const pinRoute = require("./routes/pins");
const path = require("path");

dotenv.config();

app.use(express.json());

mongoose 
 .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,   })   
 .then(() => console.log("MongoDB connected!"))
 .catch(err => console.log(err));

app.use("/api/users", userRoute);
app.use("/api/pins", pinRoute);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'mappinapp', 'build')));

  app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'mappinapp', 'build', 'index.html'));
  });
};

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});