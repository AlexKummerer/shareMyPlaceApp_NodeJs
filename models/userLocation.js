const mongoose = require("mongoose");

const UserLocationSchema = mongoose.Schema({
  address: { type: String, required: true },
  coords: { type: Object, requered: true },
});

module.exports = mongoose.model("UserLocations", UserLocationSchema);
