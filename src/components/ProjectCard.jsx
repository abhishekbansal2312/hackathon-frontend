import React from 'react';

const ProjectCard = ({ project }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
      <h2 className="text-xl font-semibold">{project.name}</h2>
      <p className="text-gray-600">{project.description}</p>
    </div>
  );
};

export default ProjectCard;
