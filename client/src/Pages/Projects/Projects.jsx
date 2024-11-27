import ProjectCard from "../../components/ProjectCard/ProjectCard";
import "./Projects.scss"
const Projects = ({ projects }) => {
    return (
        <>
            <main className="projects">

                <ul className="project__list">
                    {projects.map((p) => {
                        return <ProjectCard project={p} key={p.id} />;

                    })}
                </ul>
            </main>
        </>
    );
}

export default Projects