const express = require("express");

const router = express.Router();

const locationStorage = {
  locations: [],
};

router.post("/add-location", (req, res, next) => {
  locationStorage.locations.push({
    id: Math.random(),
    address: req.body.address,
    coords: { lat: req.body.lat, lng: req.body.lng },
  });
  console.log(locationStorage.locations);
  res.json({
    message: "Stored location!",
    location: locationStorage.locations[locationStorage.locations.length - 1],
  });
});

router.get("/location/:lid", (req, res, next) => {
  const locationId = +req.params.lid;
  const location = locationStorage.locations.find((loc) => {
    return loc.id === locationId;
  });
  if (!location) {
    return res.status(404).json({ message: "Not found!" });
  }
  res.json({ address: location.address, coordinates: location.coords });
});

module.exports = router;
