import React, { useState } from "react";
import { getAuth, updatePassword,reauthenticateWithCredential,EmailAuthProvider} from "firebase/auth";




const ChangePasswordPopup = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState(null);
 

  const handleChangePassword = async () => {
    try {
    const auth = getAuth();

    const user = auth.currentUser;
    
    
    if (newPassword !== confirmNewPassword) {
    setError("New passwords do not match");
    return;
    }
    const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        currentPassword
    )  

      const result = await reauthenticateWithCredential(
        auth.currentUser, 
        credential
    )  

      updatePassword(user, newPassword).then(() => {
                console.log("Password updated successfully");
        }).catch((error) => {
                    setError(error.message);
    });
      setError(null);
      onClose();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-700 backdrop-filter backdrop-blur-sm text-gray-700">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white w-96 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Change Password</h2>
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="border rounded px-3 py-2 mb-4 w-full"
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="border rounded px-3 py-2 mb-4 w-full"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="border rounded px-3 py-2 mb-4 w-full"
          />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex justify-between">
            <button
              onClick={handleChangePassword}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Change Password
            </button>
            <button
              onClick={onClose}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPopup;
