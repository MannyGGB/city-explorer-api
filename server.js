const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());

const data = require("./data/weather.json");

// add your endpoints here
app.get("/weather", (request, response) => {
  const lat = request.query.lat;
  const lon = request.query.lon;
  const searchQuery = request.query.searchQuery;

  const foundCity = data.find((city) => {
    return (
      city.city_name === searchQuery && city.lat === lat && city.lon === lon
    );
  });
  const processedData = foundCity.data.map((day) => {
    return {
      description: day.weather.description,
      date: day.datetime,
    };
  });
  response.json(processedData);
});
app.listen(PORT, () => console.log(`App is running PORT ${PORT}`));
