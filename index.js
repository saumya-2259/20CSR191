const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// GET /numbers endpoint
app.get('/numbers', async (req, res) => {
  const urls = req.query.url;

  if (!urls) {
    return res.status(400).json({ error: 'URLs not provided in query parameters.' });
  }

  try {
    const numberPromises = urls.map(url => axios.get(url));
    const responses = await Promise.all(numberPromises);

    const numbers = responses.map(response => response.data);
    res.json(numbers);
  } catch (error) {
    console.error('Error fetching numbers:', error.message);
    res.status(500).json({ error: 'Error fetching numbers. Please check the provided URLs.' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});