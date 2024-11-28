import React, { useState, useEffect } from 'react';
import { Bitcoin } from 'lucide-react';
import { historicalPrices, HistoricalPrices } from '../data/bitcoinData';
import { calculateCurrentValue, formatCurrency } from '../utils/calculations';

interface CalculatorProps {
  currentPrice: number | null;
  onValuesChange: (investment: number, currentValue: number) => void;
}

export const Calculator: React.FC<CalculatorProps> = ({ currentPrice, onValuesChange }) => {
  const [investment, setInvestment] = useState<string>('1000');
  const [purchaseDate, setPurchaseDate] = useState<string>('2017-01-01');

  const currentValue = calculateCurrentValue(
    Number(investment),
    purchaseDate,
    historicalPrices,
    currentPrice ?? historicalPrices['2024-01-01']
  );

  useEffect(() => {
    onValuesChange(Number(investment), currentValue);
  }, [investment, currentValue, onValuesChange]);

  const profit = currentValue - Number(investment);
  const profitPercentage = ((profit / Number(investment)) * 100).toFixed(2);

  const formatDate = (date: keyof HistoricalPrices): string => {
    if (date === 'today') {
      return `Today (${formatCurrency(currentPrice ?? historicalPrices['2024-01-01'])})`;
    }
    return `${date} (${formatCurrency(historicalPrices[date])})`;
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-8">
        <Bitcoin className="w-8 h-8 text-orange-500" />
        <h2 className="text-2xl font-bold text-gray-800">Investment Calculator</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Initial Investment (USD)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={investment}
              onChange={(e) => setInvestment(e.target.value)}
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Enter amount"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Purchase Date
          </label>
          <select
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            {(Object.keys(historicalPrices) as Array<keyof HistoricalPrices>).map((date) => (
              <option key={date} value={date}>
                {formatDate(date)}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Investment Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Initial Investment:</span>
              <span className="font-medium">{formatCurrency(Number(investment))}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Current Value:</span>
              <span className="font-medium">{formatCurrency(currentValue)}</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-gray-200">
              <span className="text-gray-600">Profit/Loss:</span>
              <span className={`font-medium ${profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatCurrency(profit)} ({profitPercentage}%)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};