import React from 'react';

interface HomePageProps {
  navigateToChat: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ navigateToChat }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <h1 className="text-5xl md:text-7xl font-bold text-blue-300 tracking-wide">
        The Dream Lab
      </h1>
      <p className="text-lg md:text-2xl text-gray-400 mt-4 font-light">
        We explore the questions we want answers for..
      </p>
      <button 
        onClick={navigateToChat}
        className="mt-10 px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-500 transform hover:scale-105 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500"
      >
        Meet Dr. Rhesus
      </button>
    </div>
  );
};

export default HomePage;
