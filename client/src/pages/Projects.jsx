import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faChrome } from '@fortawesome/free-brands-svg-icons';
import './Projects.css';
import { projectFunctionStore } from '../store/project.store';
import { useEffect } from 'react';

const Projects = () => {

  const {fetchProjects, projects} = projectFunctionStore();
  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="projects-page">
      <div className="container">
        <h1 className="section-title">My <span>Projects</span></h1>
        <p className="projects-intro">
          Here are some of my recent projects that showcase my skills and expertise in full-stack development.
          Each project represents unique challenges and solutions that I've implemented.
        </p>
        
        <div className="projects-grid">
          {projects.map((project) => (
            <div className="project-card" key={project.id}>
              <div className="project-image">
                <img src={project.projectImage} alt={project.projectName} />
                <div className="placeholder-image">
                  <span>{project.projectName}</span>
                </div>
              </div>
              
              <div className="project-content">
                <h3>{project.projectName}</h3>
                <h4>{project.projectType}</h4>
                <p>{project.projectDescription}</p>
                
                <div className="project-tech">
                  {project.projectTech.map((projectTech, index) => (
                    <span key={index}>{projectTech}</span>
                  ))}
                </div>
                
                <div className="project-links">
                  <a href={project.projectLink} target="_blank" rel="noopener noreferrer" className="demo-link">
                    <FontAwesomeIcon icon={faChrome} /> Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;