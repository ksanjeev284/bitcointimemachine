import { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Calculator } from './components/Calculator';
import { ItemList } from './components/ItemList';
import { CurrentPrice } from './components/CurrentPrice';
import { useBitcoinPrice } from './hooks/useBitcoinPrice';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { Contact } from './pages/Contact';

function App() {
  const { price: currentPrice } = useBitcoinPrice();
  const [investment, setInvestment] = useState(1000);
  const [currentValue, setCurrentValue] = useState(1000);

  const handleValuesChange = useCallback((newInvestment: number, newCurrentValue: number) => {
    setInvestment(newInvestment);
    setCurrentValue(newCurrentValue);
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Navigation */}
        <nav className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Link to="/" className="text-2xl font-bold text-orange-500">
                Bitcoin Time Machine
              </Link>
              <div className="space-x-4">
                <Link to="/privacy" className="text-gray-600 hover:text-orange-500">
                  Privacy
                </Link>
                <Link to="/terms" className="text-gray-600 hover:text-orange-500">
                  Terms
                </Link>
                <Link to="/contact" className="text-gray-600 hover:text-orange-500">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow py-8 px-4">
          <Routes>
            <Route path="/" element={
              <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
                  Bitcoin Time Machine
                </h1>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-8">
                    <CurrentPrice />
                    <Calculator 
                      currentPrice={currentPrice} 
                      onValuesChange={handleValuesChange}
                    />
                  </div>
                  
                  <div className="lg:pl-8">
                    <ItemList 
                      currentValue={currentValue} 
                      initialInvestment={investment}
                    />
                  </div>
                </div>
              </div>
            } />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white shadow-md mt-auto">
          <div className="container mx-auto py-8 px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* About */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">About</h3>
                <p className="text-gray-600 text-sm">
                  Bitcoin Time Machine helps you calculate potential returns on Bitcoin investments.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/" className="text-gray-600 hover:text-orange-500 text-sm">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-gray-600 hover:text-orange-500 text-sm">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Legal</h3>
                <ul className="space-y-2">
                  <li>
                    <Link to="/privacy" className="text-gray-600 hover:text-orange-500 text-sm">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms" className="text-gray-600 hover:text-orange-500 text-sm">
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Contact</h3>
                <ul className="space-y-2">
                  <li className="text-gray-600 text-sm">
                    Email: ksanjeev284@gmail.com
                  </li>
                  <li className="text-gray-600 text-sm">
                    Website: bitcointimemachine.shop
                  </li>
                </ul>
              </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} Bitcoin Time Machine. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;