import React from 'react';

export const Privacy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      
      <div className="prose prose-lg">
        <p className="mb-4">Last updated: December 9, 2024</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
          <p>We do not collect any personal information from our users. Our website is designed to function without the need for user data collection.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Bitcoin Price Data</h2>
          <p>We fetch Bitcoin price data from public APIs. This data is cached temporarily to improve performance but contains no personal information.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Cookies</h2>
          <p>We do not use cookies or any other tracking mechanisms on our website.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Contact</h2>
          <p>For any questions about this privacy policy, please contact us at: ksanjeev284@gmail.com</p>
        </section>
      </div>
    </div>
  );
};
