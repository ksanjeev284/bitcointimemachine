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
    <div className="w-full bg-white rounded-xl shadow-lg p-6 sticky top-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">What You Could Buy With Your Profits</h2>
      <div className="grid grid-cols-1 gap-6">
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
              <div className="flex">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-cover"
                />
                <div className="flex-1 p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600 font-medium">{formatCurrency(item.price)}</p>
                  {canAfford ? (
                    <p className="text-green-600 font-medium mt-2">
                      You could buy {quantity} with your profits!
                    </p>
                  ) : (
                    <p className="text-red-600 font-medium mt-2">
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