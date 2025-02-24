import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function SignInSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 style={{ backgroundColor: '#D9C9A8' }}">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Choose Your Role
        </h2>
        <div className="space-y-4">
          <button
            onClick={() => navigate('/signup')}
            className="w-full py-4 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            Sign in as User
          </button>
          <button
            onClick={() => navigate('/driver-login')}
            className="w-full py-4 px-6 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200"
          >
            Sign in as Driver
          </button>






          
        </div>

      </motion.div>
    </div>



  );
}

export default SignInSelection;