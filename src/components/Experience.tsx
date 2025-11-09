import ProjectCard from "src/components/ProjectCards";
import { projects } from "src/data/projects";

const Experience = () => {
  return (
    <div className="mt-4">
      <div className="space-y-4">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            icon={project.icon}
            bgImage={project.bgImage}
            title={project.title}
            description={project.description}
            link={project.link}
          />
        ))}
      </div>
    </div>
  );
};

export default Experience;
