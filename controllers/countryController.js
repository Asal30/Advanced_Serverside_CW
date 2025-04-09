import axios from 'axios';

export const getCountryData = async (req, res) => {
  try {
    const { name } = req.params; 

    const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
    const country = response.data[0];

    const filteredData = {
      name: country.name.common,
      currency: Object.keys(country.currencies)[0],
      capital: country.capital?.[0] || "N/A",
      languages: Object.values(country.languages || {}),
      flag: country.flags.png
    };

    res.json(filteredData);

  } catch (error) {
    if (error.response?.status === 404) {
      res.status(404).json({ error: "Country not found" });
    } else {
      res.status(500).json({ error: "Failed to fetch country data" });
    }
  }
};