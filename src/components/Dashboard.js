import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { companyData } from '../data/mockData';
import Logo from './Logo';

const Dashboard = ({ companyCode, employeeName, onLogout }) => {
  const location = useLocation();
  const company = companyData[companyCode];

  const navigationItems = [
    {
      path: '/dashboard',
      icon: '🏠',
      label: 'Dashboard',
      description: 'Overview'
    },
    {
      path: '/vr-tour',
      icon: '🎥',
      label: 'VR Office Tour',
      description: '360° Office Tour'
    },
    {
      path: '/welcome-messages',
      icon: '👋',
      label: 'Welcome Messages',
      description: 'From Your Team'
    },
    {
      path: '/ai-assistant',
      icon: '🤖',
      label: 'AI Assistant',
      description: 'Get Help & Answers'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Logo size={32} />
            <div>
              <h1 className="text-lg font-semibold text-gray-800">Firstep</h1>
              <p className="text-sm text-gray-500">{company.name}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition duration-200 ${
                    location.pathname === item.path
                      ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <div className="font-medium">{item.label}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={onLogout}
            className="w-full px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition duration-200"
          >
            ← Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome to {company.name}!
            </h1>
            <p className="text-xl text-gray-600">
              Hi, {employeeName}! 👋
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="text-2xl mr-4">📋</div>
                <div>
                  <h3 className="font-semibold text-gray-800">Onboarding Progress</h3>
                  <p className="text-2xl font-bold text-blue-600">25%</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="text-2xl mr-4">👥</div>
                <div>
                  <h3 className="font-semibold text-gray-800">Team Members</h3>
                  <p className="text-2xl font-bold text-green-600">12</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="text-2xl mr-4">📅</div>
                <div>
                  <h3 className="font-semibold text-gray-800">Days Remaining</h3>
                  <p className="text-2xl font-bold text-orange-600">3</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {navigationItems.slice(1).map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex flex-col items-center p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition duration-200"
                >
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <div className="text-center">
                    <div className="font-medium text-gray-800">{item.label}</div>
                    <div className="text-sm text-gray-500">{item.description}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Welcome Message */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Getting Started</h2>
            <p className="text-gray-700 mb-4">
              Welcome to your onboarding journey! We've prepared everything you need to get started at {company.name}. 
              Take your time exploring each section, and don't hesitate to ask our AI assistant if you have any questions.
            </p>
            <div className="flex space-x-4">
              <Link
                to="/vr-tour"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
              >
                🎥 Start VR Tour
              </Link>
              <Link
                to="/welcome-messages"
                className="inline-flex items-center px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition duration-200"
              >
                👋 Read Messages
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 