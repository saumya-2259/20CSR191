import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [numbers, setNumbers] = useState([]);
  const [inputUrls, setInputUrls] = useState('');
  const [error, setError] = useState('');

  const handleFetchNumbers = async () => {
    try {
      setError('');
      const urls = inputUrls.split('\n').filter(url => url.trim() !== '');

      // Use Promise.all to make parallel requests to fetch numbers from different URLs.
      const responses = await Promise.all(
        urls.map(url => axios.get(url))
      );

      // Extract the numbers from each response and combine them into a single array.
      const numbersData = responses.map(response => response.data);
      const combinedNumbers = numbersData.flat();

      setNumbers(combinedNumbers);
    } catch (error) {
      console.error('Error fetching numbers:', error.message);
      setError('Error fetching numbers. Please check the provided URLs.');
    }
  };

  return (
    <div>
      <h1>Number Management Service</h1>
      <textarea
        value={inputUrls}
        onChange={(e) => setInputUrls(e.target.value)}
        placeholder="Enter URLs (one per line)"
        rows={6}
      ></textarea>
      <button onClick={handleFetchNumbers}>Fetch Numbers</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <h2>Numbers:</h2>
        <ul>
          {numbers.map((number, index) => (
            <li key={index}>{number}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
