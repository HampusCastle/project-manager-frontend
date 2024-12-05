import React, { useState, useEffect } from 'react';
import { getUserProfile, updateUserPassword } from '../services/api';
import { toastSuccess, toastError } from '../services/toastConfig';

const ProfilePage = () => {
  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await getUserProfile();
        setUserProfile(profile);
        setUsername(profile.username);
      } catch (err) {
        setError('Error fetching profile');
        toastError('Error fetching profile');
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdatePassword = async () => {
    try {
      if (oldPassword && newPassword) {
        await updateUserPassword(oldPassword, newPassword);
        toastSuccess('Lösenordet har uppdaterats!');
      } else {
        toastError('Vänligen fyll i alla fält');
      }
    } catch (err) {
      toastError('Fel vid uppdatering av lösenord');
    }
  };

  if (!userProfile) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">Uppdatera Profil</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Användarnamn</label>
        <input
          type="text"
          className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
          value={username}
          readOnly
          placeholder="Användarnamn"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Gamla lösenord</label>
        <input
          type="password"
          className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          placeholder="Gamla lösenord"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Nytt lösenord</label>
        <input
          type="password"
          className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Nytt lösenord"
        />
      </div>

      <button 
        onClick={handleUpdatePassword} 
        className="w-full p-3 bg-blue-500 text-white rounded-lg mt-4"
      >
        Uppdatera Lösenord
      </button>

      {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
    </div>
  );
};

export default ProfilePage;