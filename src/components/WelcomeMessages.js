import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { welcomeMessages, companyData } from '../data/mockData';
import Logo from './Logo';

const WelcomeMessages = ({ companyCode, employeeName }) => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const messages = welcomeMessages[companyCode];
  const company = companyData[companyCode];

  const getSenderColor = (sender) => {
    switch (sender) {
      case 'CEO':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Team Lead':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Coworker':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Logo size={32} />
            <div>
              <h1 className="text-lg font-semibold text-gray-800">Firstep</h1>
              <p className="text-sm text-gray-500">{company.name}</p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          <Link
            to="/dashboard"
            className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition duration-200"
          >
            <span className="text-xl">🏠</span>
            <div>
              <div className="font-medium">Dashboard</div>
              <div className="text-xs text-gray-500">Back to Overview</div>
            </div>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome Messages
            </h1>
            <p className="text-gray-600">
              Personal greetings from your new team at {company.name}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Messages List */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">From Your Team</h2>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition duration-200 ${
                        selectedMessage?.id === message.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                      onClick={() => setSelectedMessage(message)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center flex-shrink-0">
                          {message.image ? (
                            <img 
                              src={message.image} 
                              alt={message.name}
                              className="w-full h-full object-cover object-center"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          <div className={`text-2xl ${message.image ? 'hidden' : 'flex'}`}>
                            {message.avatar}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-medium text-gray-800">{message.name}</h3>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSenderColor(message.sender)}`}>
                              {message.sender}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 line-clamp-2">
                            {message.message.substring(0, 80)}...
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Message Detail */}
            <div className="lg:col-span-2">
              {selectedMessage ? (
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <div className="flex items-start space-x-4 mb-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center flex-shrink-0">
                      {selectedMessage.image ? (
                        <img 
                          src={selectedMessage.image} 
                          alt={selectedMessage.name}
                          className="w-full h-full object-cover object-center"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      <div className={`text-4xl ${selectedMessage.image ? 'hidden' : 'flex'}`}>
                        {selectedMessage.avatar}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center space-x-3 mb-2">
                        <h2 className="text-2xl font-bold text-gray-800">{selectedMessage.name}</h2>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getSenderColor(selectedMessage.sender)}`}>
                          {selectedMessage.sender}
                        </span>
                      </div>
                      <p className="text-gray-600">
                        {selectedMessage.sender === 'CEO' && 'Chief Executive Officer'}
                        {selectedMessage.sender === 'Team Lead' && 'Your Direct Manager'}
                        {selectedMessage.sender === 'Coworker' && 'Fellow Team Member'}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <p className="text-gray-800 leading-relaxed whitespace-pre-line">
                      {selectedMessage.message}
                    </p>
                  </div>

                  {selectedMessage.videoUrl && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Video Message</h3>
                      <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                        <p className="text-gray-500">Video player would be embedded here</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      Message received on your first day
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
                      Reply
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-lg p-8 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">👋</div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Select a Message</h3>
                    <p className="text-gray-600">
                      Choose a message from the left to read the full greeting
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 border border-green-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Next Steps</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
              <div className="flex items-start space-x-2">
                <div className="text-green-600 text-lg">📧</div>
                <div>
                  <strong>Send thank you messages</strong> to your new team members
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="text-blue-600 text-lg">🤖</div>
                <div>
                  <strong>Ask the AI Assistant</strong> about any questions you have
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="text-purple-600 text-lg">🎥</div>
                <div>
                  <strong>Take the VR tour</strong> to explore your new office
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <Link
              to="/vr-tour"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition duration-200"
            >
              ← VR Office Tour
            </Link>
            <Link
              to="/ai-assistant"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            >
              AI Assistant →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessages; 