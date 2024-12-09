const express = require('express');
const axios = require('axios');
const cors = require('cors');
const NodeCache = require('node-cache');

const app = express();
const cache = new NodeCache();
const CACHE_KEY = 'bitcoin_price';
const CACHE_TTL = 300; // 5 minutes in seconds
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Function to fetch Bitcoin price from CoinGecko
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

// Middleware to check and update cache
async function checkAndUpdateCache() {
    let price = cache.get(CACHE_KEY);
    
    if (price === undefined) {
        try {
            price = await fetchBitcoinPrice();
            cache.set(CACHE_KEY, price, CACHE_TTL);
        } catch (error) {
            console.error('Failed to update cache:', error);
            return null;
        }
    }
    
    return price;
}

// API endpoint to get Bitcoin price
app.get('/api/bitcoin-price', async (req, res) => {
    try {
        const price = await checkAndUpdateCache();
        if (price === null) {
            res.status(503).json({ error: 'Service temporarily unavailable' });
            return;
        }
        res.json({ price });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch Bitcoin price' });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    
    // Initial price fetch
    checkAndUpdateCache().catch(console.error);
    
    // Set up periodic cache updates
    setInterval(() => {
        checkAndUpdateCache().catch(console.error);
    }, CACHE_TTL * 1000);
});
