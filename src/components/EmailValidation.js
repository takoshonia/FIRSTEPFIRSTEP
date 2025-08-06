import React, { useState } from 'react';
import Logo from './Logo';

const EmailValidation = ({ onSubmit }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setIsLoading(true);
      setTimeout(() => {
        onSubmit(email.trim());
        setIsLoading(false);
      }, 500);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size={80} />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Email Verification</h1>
          <p className="text-gray-600">Please enter your email to continue</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              required
            />
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Demo:</strong> Use <code className="bg-blue-200 px-2 py-1 rounded">kitrismwnili@123</code> to continue
            </p>
          </div>
          
          <button
            type="submit"
            disabled={isLoading || !email.trim()}
            className={`w-full py-3 px-4 rounded-lg font-medium transition duration-200 ${
              isLoading || !email.trim()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Verifying...
              </div>
            ) : (
              'Verify Email'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailValidation; 