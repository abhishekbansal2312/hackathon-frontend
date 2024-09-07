import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ProjectCard from '../components/ProjectCard';

const Projects = () => {
  const projects = [
    { name: 'Project A', description: 'Description for Project A' },
    { name: 'Project B', description: 'Description for Project B' },
    // Add more projects
  ];

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4">
        <Navbar />
        <h1 className="text-2xl font-bold">Projects</h1>
        <div>
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Projects;
