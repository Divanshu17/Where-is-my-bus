import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

function Notifications() {
  const navigate = useNavigate();




  const notifications = [
    {
      id: 1,
      title: 'Bus 101 Delayed',
      message: 'Your bus is running 5 minutes late due to traffic.',
      time: '5 min ago'
    },
    {
      id: 2,
      title: 'Route Change',
      message: 'Route 202 has been temporarily modified due to road work.',
      time: '1 hour ago'
    },


    // {
    //   id: 1,
    //   title: 'Bus 101 Delayed',
    //   message: 'Your bus is running 5 minutes late due to traffic.',
    //   time: '5 min ago'
    // },
    {



      id: 3,
      title: 'Service Update',




      message: 'Normal service has resumed on all routes.',
      time: '2 hours ago'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center">
          <button
            onClick={() => navigate('/routes')}


            
            className="p-2 rounded-md hover:bg-gray-100 mr-4"
          >
            <ArrowLeftIcon className="h-6 w-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">
            Notifications
          </h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {notifications.map(notification => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm p-4"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                {notification.title}
              </h3>
              <p className="text-gray-600 mt-1">
                {notification.message}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {notification.time}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notifications;