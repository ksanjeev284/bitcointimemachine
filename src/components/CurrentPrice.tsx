import React from 'react';
import { TrendingUp } from 'lucide-react';
import { useBitcoinPrice } from '../hooks/useBitcoinPrice';
import { formatCurrency } from '../utils/calculations';

export const CurrentPrice: React.FC = () => {
  const { price, loading, error } = useBitcoinPrice();

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg mb-6">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-6 h-6 text-orange-500" />
        <h2 className="text-xl font-bold text-gray-800">Current Bitcoin Price</h2>
      </div>

      <div className="text-center">
        {loading && (
          <div className="text-gray-600">Loading current price...</div>
        )}
        {error && (
          <div className="text-red-500">{error}</div>
        )}
        {price && (
          <div className="text-3xl font-bold text-gray-900">
            {formatCurrency(price)}
          </div>
        )}
      </div>
    </div>
  );
};