const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());

const data = require("./weather.json");

function findCity(lat, lon, searchQuery) {
  return data.find(
    (city) =>
      (city.lat == lat && city.lon == lon && city.searchQuery == searchQuery) ||
      !city
  );
}
// add your endpoints here
app.get("/weather", (request, response) => {
  const cities = findCity(
    request.query.lat,
    request.query.lon,
    request.query.searchQuery
  );
  response.json(cities);
});
app.listen(PORT, () => console.log(`App is running PORT ${PORT}`));
