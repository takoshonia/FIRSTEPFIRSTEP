import React from 'react';
import { Link } from 'react-router-dom';
import { vrTourData, companyData } from '../data/mockData';
import Logo from './Logo';

const VRTour = ({ companyCode, employeeName }) => {
  const tourData = vrTourData[companyCode];
  const company = companyData[companyCode];

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
              {tourData.title}
            </h1>
            <p className="text-gray-600">
              {tourData.description}
            </p>
          </div>

          {/* VR Tour Container */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Video/360° Tour */}
            <div className="relative bg-gray-900 aspect-video">
              <iframe
                src={tourData.videoUrl}
                title="VR Office Tour"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">How to Navigate</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
              <div className="flex items-start space-x-2">
                <div className="text-blue-600 text-lg">🎥</div>
                <div>
                  <strong>Watch the 360° video</strong> to explore our office space
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="text-blue-600 text-lg">🖱️</div>
                <div>
                  <strong>Drag to look around</strong> in the 360° view
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <div className="text-blue-600 text-lg">📱</div>
                <div>
                  <strong>Use your phone</strong> for an immersive VR experience
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <Link
              to="/welcome-messages"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition duration-200"
            >
              ← Welcome Messages
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

export default VRTour; 