import React, { useState } from 'react';
import { Calculator } from './components/Calculator';
import { ItemList } from './components/ItemList';
import { CurrentPrice } from './components/CurrentPrice';
import { calculateCurrentValue } from './utils/calculations';
import { historicalPrices } from './data/bitcoinData';
import { useBitcoinPrice } from './hooks/useBitcoinPrice';

function App() {
  const [investment, setInvestment] = useState<string>('1000');
  const [purchaseDate, setPurchaseDate] = useState<string>('2017-01-01');
  const { price: currentPrice } = useBitcoinPrice();
  
  const currentValue = calculateCurrentValue(
    Number(investment),
    purchaseDate,
    historicalPrices,
    currentPrice ?? historicalPrices['2024-01-01'] // Fallback to static price if API fails
  );

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Bitcoin Time Machine
        </h1>
        <div className="flex flex-col items-center gap-12">
          <CurrentPrice />
          <Calculator currentPrice={currentPrice} />
          <ItemList currentValue={currentValue} />
        </div>
      </div>
    </div>
  );
}

export default App;