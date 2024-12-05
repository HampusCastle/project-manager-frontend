import React, { useState } from 'react';
import { createProject } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toastSuccess, toastError } from '../services/toastConfig'

const CreateProject = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await createProject(name, description);  
        toastSuccess('Project created successfully!');
        navigate('/dashboard'); 
      } catch (error) {
        toastError('Failed to create project.');
      }
    };
  
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
        <h2 className="text-3xl font-semibold text-center text-primary mb-6">Create New Project</h2>
  
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Project Name</label>
            <input
              type="text"
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Project Name"
              required
            />
          </div>
  
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Project Description</label>
            <textarea
              className="w-full p-3 mt-2 border border-gray-300 rounded-lg"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Project Description"
              required
            />
          </div>
  
          <button type="submit" className="btn w-full">Create Project</button>
        </form>
      </div>
    );
  };

  export default CreateProject;