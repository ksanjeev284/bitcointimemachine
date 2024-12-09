import React from 'react';
import { items } from '../data/bitcoinData';
import { formatCurrency } from '../utils/calculations';

interface ItemListProps {
  currentValue: number;
  initialInvestment: number;
}

export const ItemList: React.FC<ItemListProps> = ({ currentValue, initialInvestment }) => {
  const profit = currentValue - initialInvestment;

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:sticky lg:top-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">What You Could Buy With Your Profits</h2>
      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        {items.map((item) => {
          const canAfford = profit >= item.price;
          const quantity = Math.floor(profit / item.price);

          return (
            <div
              key={item.name}
              className={`relative overflow-hidden rounded-xl border ${
                canAfford ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-32">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full sm:w-32 h-48 sm:h-32 object-cover"
                  />
                </div>
                <div className="flex-1 p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.name}</h3>
                  <p className="text-gray-600 font-medium mb-2">{formatCurrency(item.price)}</p>
                  {canAfford ? (
                    <p className="text-green-600 font-medium">
                      You could buy {quantity} with your profits!
                    </p>
                  ) : (
                    <p className="text-red-600 font-medium">
                      You need {formatCurrency(item.price - profit)} more in profits
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};