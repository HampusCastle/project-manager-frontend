import React from 'react';
import { Task } from '../types/Task';

interface TaskCardProps {
  task: Task;
  onDelete: (taskId: string) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'TODO':
        return 'bg-blue-200 text-blue-600'; 
      case 'IN_PROGRESS':
        return 'bg-yellow-200 text-yellow-600'; 
      case 'COMPLETED':
        return 'bg-green-200 text-green-600'; 
      default:
        return 'bg-gray-200 text-gray-600'; 
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.delete-button')) {
      return;
    }
    console.log('Open Modal for Task:', task.title); 
  };

  return (
    <div
      className={`task-card p-4 rounded-lg shadow-sm mb-2 cursor-pointer flex flex-col justify-between h-full border border-gray-200 relative ${getStatusColor(task.status)}`}
      onClick={handleCardClick}  
    >
      <div className="flex flex-col justify-center items-center mb-4">
        <h4 className={`text-lg font-semibold text-center mb-2 ${getStatusColor(task.status).split(' ')[1]}`}>
          {task.title}
        </h4>
        <p className="text-center">{task.description}</p>
      </div>
      <div className="border-t border-gray-300 my-4"></div>
      <div className={`status-label text-center ${getStatusColor(task.status).split(' ')[1]}`}>
        {task.status === 'TODO' ? 'To Do' : task.status === 'IN_PROGRESS' ? 'In Progress' : 'Completed'}
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation(); 
          onDelete(task.id);  
        }}
        className="delete-button absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 w-8 h-8 flex items-center justify-center hover:bg-red-700 focus:outline-none"
        aria-label="Delete Task"
      >
        <span className="text-xl font-bold">-</span>
      </button>
    </div>
  );
};

export default TaskCard;