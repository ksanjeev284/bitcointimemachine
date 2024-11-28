import React, { useState } from 'react';
import { Bitcoin } from 'lucide-react';
import { historicalPrices } from '../data/bitcoinData';
import { calculateCurrentValue, formatCurrency } from '../utils/calculations';

interface CalculatorProps {
  currentPrice: number | null;
}

export const Calculator: React.FC<CalculatorProps> = ({ currentPrice }) => {
  const [investment, setInvestment] = useState<string>('1000');
  const [purchaseDate, setPurchaseDate] = useState<string>('2017-01-01');

  const currentValue = calculateCurrentValue(
    Number(investment),
    purchaseDate,
    historicalPrices,
    currentPrice ?? historicalPrices['2024-01-01']
  );

  const profit = currentValue - Number(investment);
  const profitPercentage = ((profit / Number(investment)) * 100).toFixed(2);

  const formatDate = (date: string): string => {
    if (date === 'today') {
      return `Today (${formatCurrency(currentPrice ?? historicalPrices['2024-01-01'])})`;
    }
    return `${date} (${formatCurrency(historicalPrices[date])})`;
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <Bitcoin className="w-8 h-8 text-orange-500" />
        <h2 className="text-2xl font-bold text-gray-800">Bitcoin Calculator</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Initial Investment (USD)
          </label>
          <input
            type="number"
            value={investment}
            onChange={(e) => setInvestment(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Purchase Date
          </label>
          <select
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {Object.keys(historicalPrices).map((date) => (
              <option key={date} value={date}>
                {formatDate(date)}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Results</h3>
          <div className="space-y-2">
            <p className="text-gray-600">
              Initial Investment: {formatCurrency(Number(investment))}
            </p>
            <p className="text-gray-600">
              Current Value: {formatCurrency(currentValue)}
            </p>
            <p className={`font-medium ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              Profit/Loss: {formatCurrency(profit)} ({profitPercentage}%)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};