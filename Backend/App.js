const express = require("express");
const connectToMongoDB = require("./connection/conn");
const auth = require("./routes/authRoutes");
const aeventRoutes = require("./routes/aeventRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const registrationRoutes = require("./routes/registrationRoutes");
const adminRoutes = require("./routes/adminRoutes");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());

connectToMongoDB()
  .then(() => {
    app.use(express.json());

    app.use("/api/v1/auth", auth);
    app.use("/api/v2", aeventRoutes);
    app.use("/api/v2", galleryRoutes);
    app.use("/api/v2", registrationRoutes);
    app.use("/api", adminRoutes);


    app.get("/", (req, res) => {
      res.send("Hello World!");
    });

    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });
