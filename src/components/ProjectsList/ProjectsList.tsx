import React from "react";
import styles from "./ProjectsList.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

type Project = {
  title: string;
  description: string;
  tags: string[];
  github?: string;
  website?: string;
  altWebsite?: string;
};

type ProjectsListProps = {
  projects: Project[];
};

const ProjectsList: React.FC<ProjectsListProps> = ({ projects }) => (
  <div className={styles.container}>
    {projects.map((project, idx) => (
      <div key={idx} className={styles.card}>
        <div className={styles.header}>
          <h3 className={styles.title}>{project.title}</h3>
          <div className={styles.right}>
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            )}
            {project.website && (
              <a href={project.website} target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faGlobe} />
              </a>
            )}
            {project.altWebsite && (
              <a href={project.altWebsite} target="_blank" rel="noreferrer">
                <FontAwesomeIcon icon={faGlobe} />
              </a>
            )}
          </div>
        </div>
        <p className={styles.description}>{project.description}</p>
        <div className={styles.tags}>
          {project.tags.map((tag, tagIdx) => (
            <span key={tagIdx} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export default ProjectsList;
