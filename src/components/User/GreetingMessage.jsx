import React from 'react';

const GreetingMessage = ({ firstName, lastName }) => {
  const generateGreeting = () => {
    return `Hello, ${firstName} ${lastName}! Welcome to your personalized space! 🎉`;
  };

  return (
    <div  className='flex justify-center mt-9'>
      {/* Container for greeting message */}
      <div className="w-11/12 md:w-1/2 lg:w-1/3 xl:w-1/4 bg-gray-800 p-6 rounded-xl shadow-xl transform transition-all duration-500 hover:scale-105 border-4 border-gray-500 hover:border-blue-500 relative">

        {/* Background gradient effect */}
        <div className="absolute top-0 left-0 right-0 bottom-0 rounded-xl bg-gradient-to-br from-blue-500 to-green-500 opacity-10"></div>

        {/* Greeting content */}
        <div className="relative z-10">
          <div className="flex flex-col items-center space-y-4">
            {firstName && lastName ? (
              <div className="mt-4 text-xl text-white font-semibold text-center">
                <p>{generateGreeting()}</p>
              </div>
            ) : (
              <div className="text-lg text-white font-medium text-center">
                <p>Please provide both your first and last name to see your greeting!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GreetingMessage;
