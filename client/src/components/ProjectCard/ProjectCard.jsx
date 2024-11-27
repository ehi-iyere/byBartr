import { Link, useParams } from "react-router-dom";
import "./ProjectCard.scss";

const ProjectCard = ({ project }) => {
    return (
        <Link to={`/projects/${project.id}`} className="projectcard">
            <li className="projectcard__item">
                <div
                    className="projectcard__cover"
                    style={{ backgroundImage: `url(${project.thumbnail})` }}
                ></div>
                <div className="projectcard__text">
                    <p className="projectcard__title">{project.title}</p>
                    <p className="projectcard__descrip">{project.description}</p>
                </div>
            </li>
        </Link>
    );
};

export default ProjectCard

