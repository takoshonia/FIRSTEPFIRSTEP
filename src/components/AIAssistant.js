import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { aiResponses, companyData } from '../data/mockData';
import Logo from './Logo';

const AIAssistant = ({ companyCode, employeeName }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: `Hi! I'm your AI onboarding assistant. I'm here to help you get settled at ${companyData[companyCode].name}. What would you like to know?`,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickQuestions = [
    "What's the dress code?",
    "Where can I find lunch options?",
    "How do I report sick leave?",
    "What are the office hours?",
    "Where is the IT support?"
  ];

  const handleSendMessage = async (message) => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: message,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = aiResponses[message] || 
        "I'm sorry, I don't have specific information about that. Please try asking about dress code, lunch options, sick leave, office hours, or IT support. You can also reach out to your team lead for more specific questions.";
      
      const aiMessage = {
        id: Date.now() + 1,
        type: 'ai',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(inputMessage);
  };

  const handleQuickQuestion = (question) => {
    handleSendMessage(question);
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
              <p className="text-sm text-gray-500">{companyData[companyCode].name}</p>
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
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-6">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">🤖</div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">AI Assistant</h1>
              <p className="text-gray-600">Your personal onboarding guide</p>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-200 text-gray-800'
                  }`}
                >
                  <p className="whitespace-pre-line">{message.content}</p>
                  <p className={`text-xs mt-2 ${
                    message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 text-gray-800 px-4 py-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length === 1 && (
            <div className="px-6 pb-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-800 mb-3">Quick Questions:</h3>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      className="px-3 py-2 bg-white text-blue-600 border border-blue-200 rounded-lg text-sm hover:bg-blue-50 transition duration-200"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Input */}
          <div className="bg-white border-t border-gray-200 p-6">
            <form onSubmit={handleSubmit} className="flex space-x-4">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me anything about your onboarding..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isTyping}
                className={`px-6 py-3 rounded-lg font-medium transition duration-200 ${
                  !inputMessage.trim() || isTyping
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Send
              </button>
            </form>
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-gray-50 border-t border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Need More Help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
            <div className="flex items-start space-x-2">
              <div className="text-blue-600 text-lg">👥</div>
              <div>
                <strong>Contact your team lead</strong> for specific questions about your role
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="text-green-600 text-lg">📧</div>
              <div>
                <strong>Email HR</strong> at hr@monstersinc.com for policy questions
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="text-purple-600 text-lg">🎥</div>
              <div>
                <strong>Take the VR tour</strong> to explore your new office space
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white border-t border-gray-200 p-6">
          <div className="flex justify-between">
            <Link
              to="/welcome-messages"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition duration-200"
            >
              ← Welcome Messages
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant; 