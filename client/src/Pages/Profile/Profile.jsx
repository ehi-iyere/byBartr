import "./Profile.scss"
import { useAuth } from "../../contexts/authContext";
import { useState, useEffect } from "react";
import axios from "axios"
import Projects from "../Projects/Projects";


const Profile = () => {
    const { userLoggedIn, currentUser } = useAuth();
    const [userData, setUserData] = useState(null)
    const [userProjects, setUserProjects] = useState(null)


    async function getUserProjects() {
        const response = await axios.get(
            `${import.meta.env.VITE_BASEURL}project/${currentUser.uid}/projects`
        );
        console.log(response.data, "pdata")
        setUserProjects(response.data);
        console.log(userLoggedIn, "this user")

    }
    async function getUserData() {
        const response = await axios.get(
            `${import.meta.env.VITE_BASEURL}user/${currentUser.uid}`
        );
        console.log(response, "resp")
        setUserData(response.data);

    }
    useEffect(() => {
        getUserData();
        getUserProjects()
    }, []);

    if (!currentUser || !userData || userProjects === null) {
        //console.log(currentUser, userData)
        return (
            <h1>Loading</h1>
        )
    }

    return (
        <>
            {console.log(userProjects, "hello")}
            <main className="profile">

                <div className="projects">
                    <Projects projects={userProjects} />
                </div>
            </main>
        </>
    );
}

export default Profile