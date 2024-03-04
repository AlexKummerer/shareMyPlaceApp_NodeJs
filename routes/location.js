const express = require("express");

const mongoose = require("mongoose");
const UserLocations = require("../models/userLocation");

const router = express.Router();

const url = process.env.MONGO_URL || "mongodb://localhost:27017/locations";

mongoose
  .connect(url)
  .then(() => {
    console.log(process.env.MONGO_URL);
    console.log(process.env.PORT);
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

const locationStorage = {
  locations: [],
};

router.post("/add-location", (req, res, next) => {
  new UserLocations({
    address: req.body.address,
    coords: { lat: req.body.lat, lng: req.body.lng },
  })
    .save()
    .then((result) => {
      console.log(result);
      res.json({
        message: "Stored location!",
        locId: result._id, // Use the _id from the result
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/location/:lid", async (req, res, next) => {
  const locationId = req.params.lid;

  try {
    const location = await UserLocations.findById(locationId);

    if (!location) {
      return res.status(404).json({ message: "Not found!" });
    }
    res.json({ address: location.address, coordinates: location.coords });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving the location." });
  }
});

module.exports = router;
