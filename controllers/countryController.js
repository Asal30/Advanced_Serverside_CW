import axios from 'axios';
import db from '../config/database.js';

export const getCountryData = async (req, res) => {
  try {
    const { name } = req.params;

    // Case-insensitive search
    const countryInDb = await db.get(
      'SELECT * FROM countries WHERE LOWER(name) = LOWER(?)',
      [name]
    );

    if (countryInDb) {
      return res.json({
        name: countryInDb.name,
        currency: countryInDb.currency,
        capital: countryInDb.capital,
        languages: JSON.parse(countryInDb.languages),
        flag: countryInDb.flag
      });
    }

    // Fetch from external API
    const response = await axios.get(`https://restcountries.com/v3.1/name/${encodeURIComponent(name)}`);
    const country = response.data[0];

    const filteredData = {
      name: country.name.common,
      currency: Object.keys(country.currencies)[0],
      capital: country.capital?.[0] || "N/A",
      languages: Object.values(country.languages || []),
      flag: country.flags.png
    };

    // Save to DB
    await db.run(
      `INSERT INTO countries (name, currency, capital, languages, flag)
       VALUES (?, ?, ?, ?, ?)`,
      [
        filteredData.name,
        filteredData.currency,
        filteredData.capital,
        JSON.stringify(filteredData.languages),
        filteredData.flag
      ]
    );

    res.json(filteredData);

  } catch (error) {
    if (error.response?.status === 404) {
      res.status(404).json({ error: "Country not found" });
    } else {
      console.error("Internal error:", error);
      res.status(500).json({ error: "Failed to fetch country data" });
    }
  }
};

export const getAllCountries = async (req, res) => {
  try {
    const countries = await db.all('SELECT * FROM countries');
    
    const formatted = countries.map((country) => ({
      name: country.name,
      currency: country.currency,
      capital: country.capital,
      languages: JSON.parse(country.languages),
      flag: country.flag,
    }));

    res.json(formatted);
  } catch (error) {
    console.error("Failed to get countries:", error);
    res.status(500).json({ error: "Failed to retrieve countries" });
  }
};