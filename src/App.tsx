import { Calculator } from './components/Calculator';
import { ItemList } from './components/ItemList';
import { CurrentPrice } from './components/CurrentPrice';
import { calculateCurrentValue } from './utils/calculations';
import { historicalPrices } from './data/bitcoinData';
import { useBitcoinPrice } from './hooks/useBitcoinPrice';

function App() {
  const { price: currentPrice } = useBitcoinPrice();
  const currentValue = calculateCurrentValue(
    1000, // Default investment
    '2017-01-01', // Default purchase date
    historicalPrices,
    currentPrice ?? historicalPrices['2024-01-01']
  );

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Bitcoin Time Machine
        </h1>
        
        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column - Calculations */}
          <div className="space-y-8">
            <CurrentPrice />
            <Calculator currentPrice={currentPrice} />
          </div>
          
          {/* Right column - Items */}
          <div className="lg:pl-8">
            <ItemList currentValue={currentValue} initialInvestment={1000} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;