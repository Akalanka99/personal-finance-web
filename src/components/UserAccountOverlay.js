// UserAccountOverlay.js
import React from 'react';

const UserAccountOverlay = ({ accountName, onSignOut }) => {
  return (
    <div className="user-account-overlay absolute top-35 right-10 m-2 bg-white border border-gray-300 p-4 rounded shadow-md">
     <p className="text-gray-800">Signed in as: <strong>{accountName}</strong></p>

      <button
        onClick={onSignOut}
        className="mt-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 focus:outline-none"
      >
        Sign Out
      </button>
    </div>
  );
};

export default UserAccountOverlay;
