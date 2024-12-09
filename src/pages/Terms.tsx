import React from 'react';

export const Terms: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      
      <div className="prose prose-lg">
        <p className="mb-4">Last updated: December 9, 2024</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p>By accessing and using Bitcoin Time Machine, you accept and agree to be bound by the terms and provision of this agreement.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Investment Disclaimer</h2>
          <p>The information provided on this website is for educational purposes only. We do not provide financial advice, and all investment decisions should be made at your own risk.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Price Data Accuracy</h2>
          <p>While we strive to provide accurate Bitcoin price data, we cannot guarantee its accuracy. The data is sourced from third-party APIs and may have delays or inaccuracies.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Contact</h2>
          <p>For any questions about these terms, please contact us at: ksanjeev284@gmail.com</p>
        </section>
      </div>
    </div>
  );
};
