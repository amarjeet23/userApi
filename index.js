require("dotenv").config();
const express = require("express");
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const logger = require("./middleware/logger")
const errorHandler = require("./middleware/error-handler")
// Mongodb connection
mongoose
  .connect(process.env.mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then((data) => {
    console.log("connected");
  })
  .catch((err) => {
    console.log(err);
  });

//Middlewares used
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger)

// Require Routes
const profileRoutes = require("./routes/profile");
const userRoutes = require("./routes/user");
app.use("/api/profile", profileRoutes);
app.use("/api/user", userRoutes);

app.use(errorHandler)
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
