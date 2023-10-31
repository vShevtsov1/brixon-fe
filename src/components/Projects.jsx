import "../styles/projects.css";
import ProjectComponent from "./ProjectComponent.jsx";
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination, Scrollbar} from "swiper/modules";
import add from "../assets/add.png";

const Projects = ({projects, hidenMenu,setFilterIsOpen,chosenCurrency }) => {
    const [showMenu,setShowMenu] = useState(false)



    return (
        <div className={`projects-container`} >

            <div className={`projects-block ${!showMenu?"hide-menu-block":"active-menu-block"}`}>
                <Swiper
                    slidesPerView={4}
                    spaceBetween={100}
                    freeMode={true}
                    scrollbar={{ draggable: true }}
                    className={`projects ${!showMenu&&"hide-menu-project"}`}
                    modules={[Pagination, Navigation,Scrollbar]}
                >
                    {projects.map((item, index1) => (
                        <SwiperSlide key={index1}>
                            <ProjectComponent project={item} chosenCurrency={chosenCurrency}/>
                        </SwiperSlide>
                    ))}



                </Swiper>
            </div>

            <div className="button-container">
                <button onClick={()=>setShowMenu(!showMenu)}>{!showMenu?"Show all projects":"Hide"}</button>
                <button onClick={()=>setFilterIsOpen(true)}>Filter</button>
            </div>
        </div>
    );
};

export default Projects;
