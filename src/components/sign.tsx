import { useState } from 'react';

export default function Sign_In({ closeModal }: { closeModal: () => void }) {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg w-96">
          {/* <h2 className="text-2xl font-bold mb-4">{isSignIn ? 'Login' : 'Register'}</h2> */}
          <div className="relative w-64 h-12 bg-gray-700 rounded-full p-1 flex items-center shadow-lg mx-auto">
            <div 
              className={
              `absolute top-1 left-0 h-10 w-32 bg-gradient-to-r from-purple-600 to-purple-400 rounded-full transition-all duration-500 
              ${ isSignIn ? "translate-x-0" : "translate-x-32" }`}
            ></div>
            <button
              className={`w-1/2 text-white font-bold z-10 transition-all duration-500 ${
                isSignIn ? "text-white" : "text-gray-400" }`}
              onClick={() => setIsSignIn(true)}
            >
              Log In
            </button>
            <button
              className={`w-1/2 text-white font-bold z-10 transition-all duration-500 ${
                isSignIn ? "text-gray-400" : "text-white" }`}
              onClick={() => setIsSignIn(false)}
            >
              Register
            </button>
          </div>
          <div className="h-4"></div>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Enter your username"
                className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 mb-4"
              />
              <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 mb-4"
              />
              {!isSignIn && (
                <>
                  <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="confirm-password">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirm-password"
                    placeholder="Confirm your password"
                    className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700 mb-4"
                  />
                </>
              )}
              <div className="flex center justify-between mt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="mr-2 bg-gray-700 hover:bg-gray-600 font-black py-3 px-6 rounded-lg hover:scale-105 duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 font-black py-3 px-6 rounded-lg hover:scale-105 duration-300"
                >
                  {isSignIn ? 'Login' : 'Register'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}