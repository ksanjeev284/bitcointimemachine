# Bitcoin Price Caching Server

This server caches Bitcoin price data to avoid rate limiting issues with the CoinGecko API.

## Features

- Caches Bitcoin price for 5 minutes
- Automatically updates price in the background
- Provides a simple API endpoint for price data
- Includes error handling and health checks

## Setup

1. Install dependencies:
```bash
cd server
npm install
```

2. Start the server:
```bash
npm start
```

The server will run on port 3001 by default.

## API Endpoints

- GET `/api/bitcoin-price` - Returns the current Bitcoin price
- GET `/health` - Health check endpoint

## Configuration

You can modify these settings in `server.js`:

- `CACHE_TTL`: Cache duration (default: 300 seconds / 5 minutes)
- `PORT`: Server port (default: 3001)

## Error Handling

The server includes:
- Automatic retry on failed price updates
- Error responses for API failures
- Cache invalidation on errors
