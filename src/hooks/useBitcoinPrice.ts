import { useState, useEffect } from 'react';
import axios from 'axios';

// Use relative URL in production, fallback to localhost in development
const API_URL = process.env.NODE_ENV === 'production'
  ? '/api/bitcoin-price'
  : 'http://localhost:8888/.netlify/functions/bitcoin-price';

const POLLING_INTERVAL = 5 * 60 * 1000; // 5 minutes in milliseconds

export const useBitcoinPrice = () => {
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await axios.get(API_URL);
        setPrice(response.data.price);
        setLastUpdated(new Date(response.data.lastUpdated));
        setError(null);
      } catch (err) {
        console.error('Error fetching price:', err);
        setError('Failed to fetch Bitcoin price');
        setPrice(null);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchPrice();

    // Set up polling
    const interval = setInterval(fetchPrice, POLLING_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return { 
    price, 
    loading, 
    error,
    lastUpdated 
  };
};