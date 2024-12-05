import React, { useState, useEffect } from 'react';
import { getProjects } from '../services/api'; 
import ProjectCard from '../components/ProjectCard'; 
import { Link } from 'react-router-dom'; 

const Dashboard = () => {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsData = await getProjects();
        console.log("Fetched projects:", projectsData); 
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <div className="bg-gray-100 p-8 mb-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-semibold text-center mb-4 text-indigo-700">
          Welcome to Your Dashboard
        </h2>
        <p className="text-lg text-center mb-6 text-gray-700 leading-relaxed">
          Here you can manage your projects, create new ones, or view details about your ongoing tasks.
          Use the button below to start a new project, and explore your existing ones!
        </p>
      </div>

      <div className="mb-4 text-center">
        <Link 
          to="/create-project"
          className="btn hover:bg-indigo-600 text-center"
        >
          Create New Project
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <p className="text-center text-gray-500">No projects found. Start by creating a new one!</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;