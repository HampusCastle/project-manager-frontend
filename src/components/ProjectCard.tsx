import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }: { project: any }) => (
  <div className="project-card border p-6 mb-4 rounded-lg bg-white shadow-lg hover:shadow-xl transition-all flex flex-col items-center justify-between">
    <h3 className="text-2xl font-semibold text-primary mb-2 text-center">{project.name}</h3>
    <p className="description text-gray-700 mb-4 text-center">{project.description}</p>
    <Link to={`/project/${project.id}`} className="btn hover:bg-blue-600 text-center">
      Go to Project
    </Link>
  </div>
);

export default ProjectCard;