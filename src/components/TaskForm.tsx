import React, { useState } from 'react';

const TaskForm = ({ onCreate }: { onCreate: (name: string, description: string) => void }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(name, description); 
    setName('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Task Title</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="w-full p-3 mt-2 border border-gray-300 rounded-lg" 
          placeholder="Task Title" 
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Task Description</label>
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          className="w-full p-3 mt-2 border border-gray-300 rounded-lg" 
          placeholder="Task Description" 
        />
      </div>
    </form>
  );
};

export default TaskForm;