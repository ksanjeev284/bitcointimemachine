import React from 'react';
import { TrendingUp } from 'lucide-react';
import { useBitcoinPrice } from '../hooks/useBitcoinPrice';
import { formatCurrency } from '../utils/calculations';

export const CurrentPrice: React.FC = () => {
  const { price, loading, error, lastUpdated } = useBitcoinPrice();

  const formatLastUpdated = (date: Date | null) => {
    if (!date) return '';
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000); // difference in seconds

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    return `${Math.floor(diff / 3600)} hours ago`;
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-6 h-6 text-orange-500" />
        <h2 className="text-xl font-bold text-gray-800">Current Bitcoin Price</h2>
      </div>

      <div className="mt-4">
        {loading && (
          <div className="flex items-center justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        )}
        {error && (
          <div className="text-red-500 text-center py-4">{error}</div>
        )}
        {price && (
          <>
            <div className="text-4xl font-bold text-gray-900 text-center py-4">
              {formatCurrency(price)}
            </div>
            {lastUpdated && (
              <div className="text-sm text-gray-500 text-center">
                Last updated: {formatLastUpdated(lastUpdated)}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};