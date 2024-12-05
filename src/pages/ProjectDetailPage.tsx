import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectById, getTasksByProject, createTask, updateTaskStatus, deleteTask, updateProject } from "../services/api";
import ProjectTaskBoard from '../components/ProjectTaskBoard';
import ProjectUpdateModal from '../components/ProjectUpdateModal';
import AddTaskModal from '../components/AddTaskModal'; 
import { Task } from '../types/Task';

const ProjectDetailPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<any>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false); 

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const fetchedProject = await getProjectById(projectId!);
        setProject(fetchedProject);
      } catch (err) {
        console.error('Error fetching project data:', err);
      }
    };

    const fetchTasks = async () => {
      try {
        const tasksData = await getTasksByProject(projectId!);
        setTasks(tasksData);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchProjectData();
      fetchTasks();
    }
  }, [projectId]);

  const handleCreateTask = async (name: string, description: string) => {
    try {
      const newTask = await createTask(name, description, projectId!);
      setTasks([...tasks, newTask]);
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    ));
  };

  const handleUpdateStatus = async (
    taskId: string,
    status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED',
    projectId: string,
    title: string,
    description: string
  ): Promise<Task> => {
    try {
      const updatedTask = await updateTaskStatus(taskId, status, projectId, title, description);
      setTasks(tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      ));
      return updatedTask;
    } catch (err) {
      console.error('Error updating task status:', err);
      throw err;
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(projectId as string, taskId); 
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const handleUpdateProject = async (newName: string, newDescription: string) => {
    try {
      await updateProject(projectId!, newName, newDescription);
      setProject({ ...project, name: newName, description: newDescription });
      alert('Project updated successfully!');
    } catch (err) {
      alert('Error updating project');
    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenAddTaskModal = () => {
    setShowAddTaskModal(true); 
  };

  const handleCloseAddTaskModal = () => {
    setShowAddTaskModal(false); 
  };

  if (loading || !project) return <div>Loading project...</div>;

  return (
    <div className="container mx-auto p-6">
      <div className="bg-gray-200 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-3xl font-bold mb-4 text-center">{project.name}</h2>
        <p className="text-lg mb-6 text-center">{project.description}</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleOpenModal}
            className="btn"
          >
            Update Project
          </button>
          <button
            onClick={handleOpenAddTaskModal} 
            className="btn bg-green-500 hover:bg-green-600 text-white"
          >
            Create New Task
          </button>
        </div>
      </div>

      <ProjectUpdateModal
        showModal={showModal}
        onClose={handleCloseModal}
        onSave={handleUpdateProject}
        currentName={project.name}
        currentDescription={project.description}
      />

      {/* AddTaskModal for creating tasks */}
      <AddTaskModal 
        isOpen={showAddTaskModal} 
        onClose={handleCloseAddTaskModal} 
        onAddTask={handleCreateTask} 
      />

      <ProjectTaskBoard
        tasks={tasks}
        updateTaskStatus={handleUpdateStatus}
        handleDeleteTask={handleDeleteTask}
        handleUpdateTask={handleUpdateTask}
        projectId={projectId!}
      />
    </div>
  );
};

export default ProjectDetailPage;