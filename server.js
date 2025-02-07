//(Node.js + Express)
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;
const GOOGLE_PLACES_API_KEY = "YOUR_GOOGLE_PLACES_API_KEY";
const CHAIN_RESTAURANTS = ["McDonald's", "Burger King", "Starbucks", "Subway", "Domino's", "KFC"];

app.use(cors());

app.get("/search", async (req, res) => {
  const { location } = req.query;

  try {
    const googleResponse = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json`, {
      params: {
        query: `restaurants in ${location}`,
        key: GOOGLE_PLACES_API_KEY,
      },
    });

    let restaurants = googleResponse.data.results.filter(
      (r) => !CHAIN_RESTAURANTS.some((chain) => r.name.includes(chain))
    );

    res.json({ restaurants });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch restaurant data" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
