import React, { useState } from 'react';
import Logo from './Logo';

const LandingPage = ({ onSubmit }) => {
  const [companyCode, setCompanyCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (companyCode.trim()) {
      setIsLoading(true);
      // Simulate loading
      setTimeout(() => {
        onSubmit(companyCode.trim());
        setIsLoading(false);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size={80} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Firstep</h1>
          <p className="text-gray-600">Smart Onboarding for Every Workplace</p>
        </div>

        {/* Company Code Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="companyCode" className="block text-sm font-medium text-gray-700 mb-2">
              Enter Company Code
            </label>
            <input
              type="text"
              id="companyCode"
              value={companyCode}
              onChange={(e) => setCompanyCode(e.target.value)}
              placeholder="e.g., TECH123"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading || !companyCode.trim()}
            className={`w-full py-3 px-4 rounded-lg font-medium transition duration-200 ${
              isLoading || !companyCode.trim()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Loading...
              </div>
            ) : (
              'Continue'
            )}
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>&copy; 2024 Firstep. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage; 