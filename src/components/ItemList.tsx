import React from 'react';
import { items } from '../data/bitcoinData';
import { formatCurrency } from '../utils/calculations';

interface ItemListProps {
  currentValue: number;
}

export const ItemList: React.FC<ItemListProps> = ({ currentValue }) => {
  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">What You Could Buy Today</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item) => {
          const canAfford = currentValue >= item.price;
          const quantity = Math.floor(currentValue / item.price);

          return (
            <div
              key={item.name}
              className={`relative overflow-hidden rounded-xl shadow-lg ${
                canAfford ? 'bg-white' : 'bg-gray-100'
              }`}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <p className="text-gray-600">{formatCurrency(item.price)}</p>
                {canAfford ? (
                  <p className="text-green-600 font-medium mt-2">
                    You could buy {quantity} of these!
                  </p>
                ) : (
                  <p className="text-red-600 font-medium mt-2">
                    You need {formatCurrency(item.price - currentValue)} more
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};