import React from 'react';

export const Contact: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="mb-6 text-lg">Have questions or suggestions? We'd love to hear from you!</p>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Email</h2>
            <p className="text-blue-600">ksanjeev284@gmail.com</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Website</h2>
            <p className="text-blue-600">bitcointimemachine.shop</p>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Response Time</h2>
            <p>We typically respond within 24-48 hours during business days.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
