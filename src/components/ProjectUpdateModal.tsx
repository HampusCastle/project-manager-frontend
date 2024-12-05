import React, { useState } from 'react';

interface ProjectUpdateModalProps {
  showModal: boolean;
  onClose: () => void;
  onSave: (newName: string, newDescription: string) => void;
  currentName: string;
  currentDescription: string;
}

const ProjectUpdateModal: React.FC<ProjectUpdateModalProps> = ({
  showModal, onClose, onSave, currentName, currentDescription
}) => {
  const [newName, setNewName] = useState(currentName);
  const [newDescription, setNewDescription] = useState(currentDescription);

  const handleSave = () => {
    onSave(newName, newDescription);
    onClose();
  };

  return (
    showModal ? (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-md">
          <h3 className="text-xl font-semibold mb-4">Update Project</h3>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter new project name"
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          />
          <textarea
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Enter new project description"
            className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          />
          <div className="flex justify-between">
            <button
              onClick={handleSave}
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
            >
              Save Changes
            </button>
            <button
              onClick={onClose}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    ) : null
  );
};

export default ProjectUpdateModal;