import React from 'react';

const AdminNavbar = () => {
  return (
    <nav className="bg-zinc-500 p-4 flex justify-between items-center">
      {/* Logo on the left */}
      <div className="flex items-center space-x-4">
        <img src="/assets/logo.jpg" alt="Logo" className="h-10 w-10 rounded-full" />
      </div>


      <img src="images.jpg" alt="" />
      {/* Centered Admin Dashboard */}
      <h1 className=" text-xl font-semibold text-sky-300 flex-1 text-center">
        Admin Dashboard
      </h1>

      {/* Home link on the right */}
      <ul className="flex space-x-6">
        <li>
          <a href="/admin" className="text-slate-900 hover:text-gray-300">Home</a>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
