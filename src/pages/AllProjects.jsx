import Header from "../components/Header.jsx";
import Profile from "../components/Profile.jsx";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import "../styles/myprojects.css";
import MyProject from "../components/MyProject.jsx";
import axios from "axios";
import table from "../assets/table.svg"
import grid from "../assets/grid.svg"
import ProjectsTable from "../components/ProjectsTable.jsx";


const AllProjects = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [chosenView,setChosenView] = useState("GRID")
    const projectsPerPage = 12; // Number of projects to display per page


    useEffect(() => {
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://brixon-811bf88a933a.herokuapp.com/api/projects/get-all',
        };

        axios.request(config)
            .then((response) => {
                setProjects(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const modalStyles = {
        content: {
            width: "343px",
            height: "530px",
            borderRadius: "16px",
            margin: "auto",
            display: "flex",
        },
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity as needed
        },
    };

    // Calculate the index of the last and first project to display
    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);



    return (
        <div className={"my-project-container"}>
            <Header isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            <div className="my-project-main-container">
                <div className="my-project-top-menu" style={{justifyContent:"flex-end"}}>

                    {chosenView==="GRID"?(<img onClick={()=>setChosenView("TABLE")} src={table} style={{width:30, cursor:"pointer",height:30,backgroundColor:"#407BFF",padding:5,borderRadius:8}}/>):
                        ( <img onClick={()=>setChosenView("GRID")} src={grid} style={{width:30,cursor:"pointer",height:30,backgroundColor:"#407BFF",padding:5,borderRadius:8}}/>)}
                </div>


                {chosenView==="GRID"? <div className="my-project-main-container__projects">
                        {currentProjects.map((project) => (
                            <MyProject key={project._id} project={project} setProjects={setProjects} projects={projects} />
                        ))}

                    </div>:
                    <div className="my-project-main-container__projects-table">
                        {currentProjects && currentProjects.length > 0 && (
                            <ProjectsTable data={currentProjects}  />
                        )}
                    </div>}
            </div>
            <div className="my-projects-navigation">
                <div className="my-projects-navigation-container">
                    <div className="my-projects-navigation-buttons" onClick={()=>{
                        if(currentPage!=1){
                            setCurrentPage(currentPage - 1);
                        }
                    }}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                        >
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M12.9067 3.6921C12.6447 3.46746 12.2501 3.49781 12.0255 3.75989L7.02545 9.59323C6.82483 9.82728 6.82483 10.1727 7.02545 10.4067L12.0255 16.24C12.2501 16.5021 12.6447 16.5325 12.9067 16.3078C13.1688 16.0832 13.1992 15.6886 12.9745 15.4266L8.32316 9.99997L12.9745 4.57338C13.1992 4.3113 13.1688 3.91674 12.9067 3.6921Z"
                                fill="#AEAEB2"
                            />
                        </svg>
                    </div>
                    <div className="my-projects-navigation-buttons-pages">
                        <div
                            className={
                                currentPage === 1
                                    ? "my-projects-navigation-buttons-pages-page-active"
                                    : "my-projects-navigation-buttons-pages-page"
                            }
                            onClick={() => setCurrentPage(1)}
                        >
                            1
                        </div>
                        {projects.length > projectsPerPage && currentPage > 4 && (
                            <div className="my-projects-navigation-buttons-pages-page">
                                ...
                            </div>
                        )}
                        {Array.from({ length: Math.min(3, Math.ceil(projects.length / projectsPerPage)) }).map((_, index) => {
                            const pageNumber = index + 2;
                            return (
                                pageNumber <= Math.ceil(projects.length / projectsPerPage) && (
                                    <div
                                        key={pageNumber}
                                        className={
                                            currentPage === pageNumber
                                                ? "my-projects-navigation-buttons-pages-page-active"
                                                : "my-projects-navigation-buttons-pages-page"
                                        }
                                        onClick={() => setCurrentPage(pageNumber)}
                                    >
                                        {pageNumber}
                                    </div>
                                )
                            );
                        })}

                    </div>


                    <div className="my-projects-navigation-buttons"  onClick={() => {
                        if (currentPage < Math.ceil(projects.length / projectsPerPage)) {
                            setCurrentPage(currentPage + 1);
                        }
                    }}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                        >
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M7.09327 3.6921C7.35535 3.46746 7.74991 3.49781 7.97455 3.75989L12.9745 9.59323C13.1752 9.82728 13.1752 10.1727 12.9745 10.4067L7.97455 16.24C7.74991 16.5021 7.35535 16.5325 7.09327 16.3078C6.83119 16.0832 6.80084 15.6886 7.02548 15.4266L11.6768 9.99997L7.02548 4.57338C6.80084 4.3113 6.83119 3.91674 7.09327 3.6921Z"
                                fill="#AEAEB2"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            <Modal isOpen={isModalOpen} style={modalStyles}>
                <Profile setIsModalOpen={setIsModalOpen} />
            </Modal>
        </div>
    );
};

export default AllProjects;
