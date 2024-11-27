import { useParams } from "react-router-dom";
import "./Project.scss"
import axios from "axios"
import { useEffect, useState } from "react";
const Project = ({ projects }) => {
    const [project, setProject] = useState(null)
    const { projectId } = useParams();
    // const project = projects.filter((p) => p.id == projectId)[0]
    // console.log(projectId)
    // console.log(project)
    // console.log(projects)
    async function getProjectsById() {
        const resp = await axios.get(
            `${import.meta.env.VITE_BASEURL}project/${projectId}/details`

        );
        setProject(resp.data)
        console.log(resp.data, "here")
    }

    useEffect(() => {
        getProjectsById()
    }, [])

    if (!project) {
        return (
            <h1>Loading</h1>
        )
    }
    return (
        <div className="project">
            <div className="project__detail">
                <h1
                    className="project__title
          "
                >
                    {project.title}
                </h1>

                <div
                    className="project__cover"
                    style={{ backgroundImage: `url(${project.thumbnail})` }}
                ></div>
                <p className="project__heading">DESCRIPTION</p>
                <p className="project__descrip">{project.description}</p>
                <p className="project__heading">DEADLINE</p>
                <p className="project__duedate">{project.deadline}</p>
            </div>
            <hr
                className="projectdivider
          "
            />
            <p className="project__heading">CREATOR INFO</p>
            <div className="project__user">
                <h2
                    className="project__title
          "
                >
                    {project.display_name}
                </h2>

                <p className="project__userbio">{project.display_name}</p>
                <p className="project__userrating">{project.bio}</p>
                {/* <Rating name="read-only" value={user.ratings} readOnly /> */}

            </div>
            <hr
                className="project__divider
          "
            />
            {/* <div className="project__buttons">
                {isUser ? (
                    <Link to={`/${thisUser.username}/${project.id}/edit`}>
                        <button className="project__button">EDIT</button>
                    </Link>
                ) : (
                    <Link to={`/${thisUser.username}/chat/${project.id}`}>
                        <button className="project__button">OFFER</button>
                    </Link>
                )}
            </div> */}
        </div>
    );
}

export default Project