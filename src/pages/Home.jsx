import Header from "../components/Header.jsx";
import Filter from "../components/Filter.jsx";
import GoogleMapReact from 'google-map-react';
import React, {useEffect, useState} from "react";
import Modal from 'react-modal';
import Profile from "../components/Profile.jsx";
import "../styles/style.css"
import Projects from "../components/Projects.jsx";
import SimpleMap from "../components/MapComponent.jsx";
import {GoogleMap, useJsApiLoader} from "@react-google-maps/api";
import MapComponent from "../components/MapComponent.jsx";
import axios from "axios";
import MenuFilter from "../components/MenuFilter.jsx";




const Home = () => {
    const [menuVisible, setMenuVisible] = useState(true);
    const [menuVisibleFilter, setMenuVisibleFilter] = useState(false);
    const [projects,setProjects] = useState([])
    const [isModalOpen, setIsModalOpen]=useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState('AED');
    const [menuState, setMenuState] = useState({
        selectedStatus: "Any",
        selectedType: "Apartments",
        selectedBathroom: "Auto",
        selectedBedrooms: "Studio",
        budgetRange: [100000, 20000000],
        sizeRange: [100, 5100],
    });

    function resetFilter(){
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
    }
    function applyFiltersAndFindTheProject() {
        let data = JSON.stringify({
            "selectedStatus": menuState.selectedStatus,
            "selectedProperty": menuState.selectedType,
            "selectedBedrooms": menuState.selectedBedrooms,
            "priceFromMin": menuState.budgetRange[0],
            "priceFromMax": menuState.budgetRange[1],
            "sizeFromMin":menuState.sizeRange[0],
            "sizeFromMax": menuState.sizeRange[1]
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://brixon-811bf88a933a.herokuapp.com/api/projects/search',
            headers: {
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios.request(config)
            .then((response) => {
               setProjects(response.data)
            })
            .catch((error) => {
                console.log(error);
            });
    }
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
            width: '343px',
            height: '470px',
            borderRadius: '16px',
            margin: 'auto',
            display: 'flex',
            zIndex: 1000 // Add the desired z-index value


        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)' ,// Adjust the opacity as needed
            zIndex: 999
        }
    };

    return(<div className={"home-block"}>
        <Header isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} settings={true} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} />
        <div className="main-block" style={{height: 'calc(100vh - 100px)'}}>

            <div style={{ height: 'calc(100vh - 100px)', width: '100%',display:"flex",position:"relative" }}>
                <MapComponent projects={projects} chosenCurrency={selectedCurrency}/>
                <Projects projects={projects} hidenMenu={menuVisible} setFilterIsOpen={setMenuVisibleFilter} chosenCurrency={selectedCurrency}/>
            </div>

        </div>
        <Modal
            isOpen={isModalOpen}
            style={modalStyles}
        >
            <Profile setIsModalOpen={setIsModalOpen}/>
        </Modal>
        <MenuFilter isOpen={menuVisibleFilter} setIsOpen={setMenuVisibleFilter} menuState={menuState} setMenuState={setMenuState} applyFiltersAndFindTheProject={applyFiltersAndFindTheProject} resetFilter={resetFilter}/>

    </div>)
}
export default Home