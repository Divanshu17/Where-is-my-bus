import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPinIcon } from '@heroicons/react/24/outline';

function LocationPermission() {
  const navigate = useNavigate();

  const handleEnableLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          


          navigate('/routes');
        },
        (error) => {
          


          console.error('Location access denied:', error);
        }
      );
    }
  };

  return (








    <div className="min-h-screen flex flex-col items-center justify-center px-4 style={{ backgroundColor: '#D9C9A8' }}">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md text-center"
      >
        <div className="mb-8">
          <MapPinIcon className="h-16 w-16 text-blue-600 mx-auto" />
        </div>

        
        
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Enable Location
        </h2>
        <p className="text-gray-600 mb-8">
          We need your location to show you nearby buses and provide accurate arrival times. Your location data is only used while you're using the app.
        </p>
        <button
          onClick={handleEnableLocation}
          className="btn-primary w-full"
        >
          

          Enable Location Access
        </button>
      </motion.div>
    </div>
  );
}




// export default LocationAccess;*/}*/}*/}*/}*/}*/}*/}*/

export default LocationPermission;