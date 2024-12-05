import React, { useState, useEffect } from 'react';
import { Task } from '../types/Task';

interface TaskUpdateModalProps {
  task: Task;
  onClose: () => void;
  onSave: (taskId: string, status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED', projectId: string, title: string, description: string) => void;
  projectId: string;
}

const TaskUpdateModal: React.FC<TaskUpdateModalProps> = ({ task, onClose, onSave, projectId }) => {
  const [updatedTask, setUpdatedTask] = useState<Task>({ ...task });

  useEffect(() => {
    setUpdatedTask({ ...task });
  }, [task]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedTask((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value as 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
    setUpdatedTask(prevState => ({
      ...prevState,
      status
    }));
  };

  const handleSave = () => {
    onSave(updatedTask.id, updatedTask.status, projectId, updatedTask.title, updatedTask.description);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h3 className="text-xl font-semibold mb-4">Update Task</h3>
        <input
          type="text"
          name="title"
          value={updatedTask.title || ''}
          onChange={handleInputChange}
          placeholder="Task Title"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        />
        <textarea
          name="description"
          value={updatedTask.description || ''}
          onChange={handleInputChange}
          placeholder="Description"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        />
        <select
          name="status"
          value={updatedTask.status}
          onChange={handleStatusChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
        >
          <option value="TODO">TODO</option>
          <option value="IN_PROGRESS">IN PROGRESS</option>
          <option value="COMPLETED">COMPLETED</option>
        </select>
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
  );
};

export default TaskUpdateModal;