import { useState, useEffect } from 'react';
import axios from 'axios';

export const useBitcoinPrice = () => {
  const [price, setPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd'
        );
        setPrice(response.data.bitcoin.usd);
        setError(null);
      } catch (err) {
        setError('Failed to fetch Bitcoin price');
        setPrice(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return { price, loading, error };
};