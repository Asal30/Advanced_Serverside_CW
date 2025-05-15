import { db } from '../config/database.js';
import axios from 'axios';
import https from 'https';

const api = axios.create({
  timeout: 60000,
  httpsAgent: new https.Agent({
    keepAlive: true,
    rejectUnauthorized: true,
    maxSockets: 5
  }),
  maxContentLength: Infinity,
  maxBodyLength: Infinity
});

const fetchAndCacheCountries = async () => {
  try {
    console.log('Starting country data synchronization...');
    
    let response;
    let attempts = 0;
    const maxAttempts = 3;
    
    while (attempts < maxAttempts) {
      try {
        attempts++;
        console.log(`Attempt ${attempts} to fetch countries...`);
        response = await api.get('https://restcountries.com/v3.1/all');
        break;
      } catch (error) {
        if (attempts === maxAttempts) {
          throw new Error(`Failed after ${maxAttempts} attempts: ${error.message}`);
        }
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }

    const countries = response.data;
    const batchSize = 50;
    let processed = 0;
    
    console.log(`Processing ${countries.length} countries in batches...`);

    for (let i = 0; i < countries.length; i += batchSize) {
      const batch = countries.slice(i, i + batchSize);
      
      await Promise.all(
        batch.map(async (country) => {
          try {
            await db.run(
              `INSERT OR REPLACE INTO countries 
              (name, currency, capital, languages, flag) 
              VALUES (?, ?, ?, ?, ?)`,
              [
                country.name?.common || 'Unknown',
                country.currencies ? Object.keys(country.currencies)[0] : 'N/A',
                country.capital?.[0] || 'N/A',
                country.languages ? JSON.stringify(Object.values(country.languages)) : '[]',
                country.flags?.png || ''
              ]
            );
            processed++;
          } catch (error) {
            console.error(`Error processing ${country.name?.common || 'unknown country'}:`, error.message);
          }
        })
      );
      
      console.log(`Processed ${processed}/${countries.length} countries`);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log(`Successfully synchronized ${processed} countries`);
    return true;
  } catch (error) {
    console.error('Country synchronization failed:', error.message);
    return false;
  }
};

export default fetchAndCacheCountries;