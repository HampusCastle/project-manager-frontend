import React, { useState, useEffect } from 'react';
import { getTasksByProject, updateTaskStatus, deleteTask } from '../services/api';

const TaskList = ({ projectId }: { projectId: string }) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null); 

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksData = await getTasksByProject(projectId);
      setTasks(tasksData);
    };
    fetchTasks();
  }, [projectId]);

  const handleOpenModal = (taskId: string) => {
    const selectedTask = tasks.find(task => task.id === taskId);
    setSelectedTask(selectedTask); 
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleUpdateStatus = async (taskId: string, status: string) => {
    try {
      const taskToUpdate = tasks.find((task) => task.id === taskId);
      if (!taskToUpdate) {
        console.error("Task not found");
        return;
      }
      await updateTaskStatus(taskId, status, projectId, taskToUpdate.title, taskToUpdate.description);
      setTasks(tasks.map((task) =>
        task.id === taskId ? { ...task, status } : task
      ));
    } catch (err) {
      console.error('Error updating task status:', err);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(projectId, taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  return (
    <div>
      <h3>Task List</h3>
      {tasks.map((task) => (
        <div key={task.id} className="task-item" onClick={() => handleOpenModal(task.id)}>
          <h4>{task.title}</h4>
          <p>{task.status}</p>

          <div>
            <button onClick={() => handleUpdateStatus(task.id, 'IN_PROGRESS')}>In Progress</button>
            <button onClick={() => handleUpdateStatus(task.id, 'COMPLETED')}>Complete</button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </div>
        </div>
      ))}

      {isModalOpen && selectedTask && (
        <div className="modal">
          <h2>{selectedTask.title}</h2>
          <p>{selectedTask.description}</p>
          <button onClick={handleCloseModal}>Close</button>
        </div>
      )}
    </div>
  );
};

export default TaskList;