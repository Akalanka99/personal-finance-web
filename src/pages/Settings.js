import Layout from '../components/Layout';
import React, { useState } from 'react';
import ChangePasswordPopup from '../components/ChangePasswordPopup';
import { getAuth} from "firebase/auth";
import { useGetUserInfo } from '../hooks/useGetUserInfo';
import CurrencySelectPopup from '../components/CurrencySelectPopup';



const Settings = () => {
  // State variables for handling settings
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
  const {provider}=useGetUserInfo();

  
  const openChangePassword = () => {
    setShowPasswordModal(true);
  };

  const closeChangePassword = () => {
    setShowPasswordModal(false);
  };

  return (
    <Layout>
      <div className="max-w-lg mx-auto mt-8 lg:ml-0">
        <h1 className='text-3xl font-semibold text-gray-800 mb-4'>SETTINGS</h1>
        <div className="space-y-4 mt-10">
          {/* Change Password Button */}
          {provider!=='google.com' && (<button
            className="w-full bg-purple-500 text-white py-2 rounded-md"
            onClick={() => setShowPasswordModal(true)}
          >
            Change Password
          </button>)}

          {/* Change Currency Button */}
          <button
            className="w-full bg-gray-300 text-gray-800 py-2 rounded-md"
            onClick={() => setShowCurrencyModal(true)}
          >
            Change Currency
          </button>

          {/* Delete Account Button */}
          <button
            className="w-full bg-red-500 text-white py-2 rounded-md"
            onClick={() => setShowDeleteAccountModal(true)}
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Modals for handling actions */}
      {/* Password Modal */}
      {showPasswordModal && (
        <ChangePasswordPopup onClose={closeChangePassword} />
      )}

      {/* Currency Modal */}
      {showCurrencyModal && (
        <CurrencySelectPopup setOverlayOpen={setShowCurrencyModal}/>
      )}

      {/* Delete Account Modal */}
      {showDeleteAccountModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-4 rounded-md max-w-md">
            {/* Add your delete account confirmation here */}
            <h2>Delete Account Confirmation</h2>
            <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => setShowDeleteAccountModal(false)}>Close</button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Settings;
