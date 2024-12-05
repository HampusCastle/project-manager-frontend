import React, { useState, useEffect } from 'react';
import { getAllUsers, deleteUser } from '../services/api';
import { toastSuccess, toastError } from '../services/toastConfig'

const UserList = () => {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersData = await getAllUsers();
      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter(user => user.id !== userId));
      toastSuccess('Användare borttagen');
    } catch (err) {
      toastError('Fel vid borttagning av användare');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h3 className="text-2xl font-semibold mb-4 text-center">User List</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map(user => (
          <div key={user.id} className="user-card bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition duration-200">
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-medium">{user.username}</p>
              <span className="text-sm text-gray-500">{user.email}</span>
            </div>
            <button
              onClick={() => handleDeleteUser(user.id)}
              className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;