const axios = require('axios');

// In-memory cache (note: this will reset when the function cold starts)
let priceCache = {
  price: null,
  lastUpdated: null
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes in milliseconds

async function fetchBitcoinPrice() {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
    );
    return response.data.bitcoin.usd;
  } catch (error) {
    console.error('Error fetching Bitcoin price:', error);
    throw error;
  }
}

exports.handler = async function(event, context) {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET'
  };

  // Handle OPTIONS request for CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    const now = Date.now();
    
    // Check if cache is valid
    if (
      priceCache.price && 
      priceCache.lastUpdated && 
      (now - priceCache.lastUpdated) < CACHE_DURATION
    ) {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          price: priceCache.price,
          lastUpdated: priceCache.lastUpdated,
          cached: true
        })
      };
    }

    // Fetch new price
    const price = await fetchBitcoinPrice();
    
    // Update cache
    priceCache = {
      price,
      lastUpdated: now
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        price,
        lastUpdated: now,
        cached: false
      })
    };
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to fetch Bitcoin price' })
    };
  }
};
