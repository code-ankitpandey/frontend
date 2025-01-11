import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const cardData = [
    {
      title: 'Payment Management',
      description: 'Manage all payment transactions and related details.',
      url: '/admin/payment-management',
    },
    {
      title: 'User Management',
      description: 'Manage users and their details within the system.',
      url: '/admin/user-management',
    },
    {
      title: 'User Account Mapping',
      description: 'Map user accounts with their advertisment accounts.',
      url: '/admin/user-account-mapping',
    },
  ];

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cardData.map((card, index) => (
        <div
          key={index}
          onClick={() => navigate(card.url)}
          className="bg-gradient-to-r from-zinc-600 to-neutral-500 text-white p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
        >
          <h2 className="text-xl mb-4 font-extrabold">{card.title}</h2>
          <p className="text-blue-300 font-mono">{card.description}</p>
        </div>
      ))}
    </div>  
  );
};

export default AdminDashboard;
