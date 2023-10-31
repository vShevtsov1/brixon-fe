import React, {useState, useRef, useEffect} from 'react';
import Header from "../components/Header.jsx";

import "../styles/admin.css";
import add from "../assets/add.png";
import search from "../assets/Search.png"
import map from "../assets/map.png"
import AdminPage1 from "../components/AdminPage1.jsx";
import AdminPage2 from "../components/AdminPage2.jsx";
import AdminPage3 from "../components/AdminPage3.jsx";
import AdminPage4 from "../components/AdminPage4.jsx";
import AdminPage5 from "../components/AdminPage5.jsx";
import AdminPage6 from "../components/AdminPage6.jsx";
import axios from 'axios';
import Modal from "react-modal";
import {HashLoader, SquareLoader} from "react-spinners";
import {useNavigate, useNavigation} from "react-router-dom";
import Profile from "../components/Profile.jsx";
import notAll from "../assets/notAll.png"
import AdminPage7 from "../components/AdminPage7.jsx";
import AdminPage8 from "../components/AdminPage8.jsx";

const AdminPanel = () => {
    const [showModal, setShowModal] = useState(false);
    const [showModalNotAll, setShowModalNotAll] = useState(false);
    const [showModalRu, setShowModalRu] = useState(true);

    const token = localStorage.getItem("token")
    const history = useNavigate()
    const [firstTabData, setFirstTabData] = useState({
        developer:'',
        imageSrcMainFile: '',
        selectedType: 'Project for investment',
        selectedYear: '',
        selectedProperty: "Apartments",
        selectedMonth: '1',
        selectedBathroom: 'Auto',
        selectedBedrooms: 'Studio',
        selectedStatus: 'Any',
        projectName: "",
        priceFrom: "",
        sizeFrom: "",
        selectedLocation: "",
        ownLocation: "",
        coordinates: {}
    });


    function sendProjectDataToServer() {
        setShowModal(true)
        // Create a new FormData object
        const formData = new FormData();

        formData.append('developer', firstTabData.developer);
        formData.append('imageSrcMain', firstTabData.imageSrcMainFile);
        formData.append('selectedType', firstTabData.selectedType);
        formData.append('selectedYear', firstTabData.selectedYear);
        formData.append('selectedMonth', firstTabData.selectedMonth);
        formData.append('selectedBathroom', firstTabData.selectedBathroom);
        formData.append('selectedBedrooms', firstTabData.selectedBedrooms);
        formData.append('selectedStatus', firstTabData.selectedStatus);
        formData.append('projectName', firstTabData.projectName);
        formData.append('priceFrom', firstTabData.priceFrom.replace(/[, ]/g, ''));
        formData.append('sizeFrom', firstTabData.sizeFrom);
        formData.append('selectedLocation', firstTabData.selectedLocation);
        formData.append('ownLocation', firstTabData.ownLocation);
        formData.append('selectedProperty', firstTabData.selectedProperty);

        formData.append('exterior', secondTabData.imageFile);
        formData.append('description', secondTabData.description);
        formData.append('descriptionRu', secondTabData.descriptionRu);

        thirdTabData.data.Studio.forEach((studioItem, index) => {
            formData.append('plansStudio[' + index + '].imgSrc', studioItem.imageFile);
            formData.append('plansStudio[' + index + '].price', studioItem.price);
            formData.append('plansStudio[' + index + '].size', studioItem.size);
        });
        thirdTabData.data["1"].forEach((studioItem, index) => {
            formData.append('plans1[' + index + '].imgSrc', studioItem.imageFile);
            formData.append('plans1[' + index + '].price', studioItem.price);
            formData.append('plans1[' + index + '].size', studioItem.size);
        });
        thirdTabData.data["2"].forEach((studioItem, index) => {
            formData.append('plans2[' + index + '].imgSrc', studioItem.imageFile);
            formData.append('plans2[' + index + '].price', studioItem.price);
            formData.append('plans2[' + index + '].size', studioItem.size);
        });
        thirdTabData.data["3"].forEach((studioItem, index) => {
            formData.append('plans3[' + index + '].imgSrc', studioItem.imageFile);
            formData.append('plans3[' + index + '].price', studioItem.price);
            formData.append('plans3[' + index + '].size', studioItem.size);
        });
        thirdTabData.data["4+"].forEach((studioItem, index) => {
            formData.append('plans4[' + index + '].imgSrc', studioItem.imageFile);
            formData.append('plans4[' + index + '].price', studioItem.price);
            formData.append('plans4[' + index + '].size', studioItem.size);
        });
        let indexarchitecture = 0;
        for (const key in fourthTabData.imageSrc) {
            if (key.endsWith("File")) {
                const image = fourthTabData.imageSrc[key];
                if (image !== "") {
                    formData.append('architecture[' + indexarchitecture + ']', image);
                    indexarchitecture++;
                }
            }
        }

        let indexinterior = 0;
        for (const key in fourthTabData.imageSrc1) {
            if (key.endsWith("File")) {
                const image = fourthTabData.imageSrc1[key];
                if (image !== "") {
                    formData.append('interior[' + indexinterior + ']', image);
                    indexinterior++;
                }
            }
        }
        let indexInfrastructure = 0;
        for (const blockKey in fifthData.data) {
            if (fifthData.data.hasOwnProperty(blockKey)) {
                const block = fifthData.data[blockKey];
                formData.append(`infrastructures[${indexInfrastructure}].imgSrc`, block.imageFile);
                formData.append(`infrastructures[${indexInfrastructure}].name`, block.name);
                formData.append(`infrastructures[${indexInfrastructure}].nameRu`, block.nameRu);
                formData.append(`infrastructures[${indexInfrastructure}].desc`, block.desc);
                formData.append(`infrastructures[${indexInfrastructure}].descRu`, block.descRu);
                indexInfrastructure++;
            }
        }
        let indexBlocks = 0;
        for (const blockKey in sixData) {
            if (thirdTabData.plans[blockKey] !== 0) {
                const block = sixData[blockKey];
                formData.append(`blocks[${indexBlocks}].blockName`, blockKey);
                formData.append(`blocks[${indexBlocks}].percent1`, block.param1.percent);
                formData.append(`blocks[${indexBlocks}].sum1`, block.param1.summ);

                formData.append(`blocks[${indexBlocks}].percent2`, block.param2.percent);
                formData.append(`blocks[${indexBlocks}].sum2`, block.param2.summ);

                formData.append(`blocks[${indexBlocks}].percent3`, block.param3.percent);
                formData.append(`blocks[${indexBlocks}].sum3`, block.param3.summ);

                formData.append(`blocks[${indexBlocks}].percent4`, block.param4.percent);
                formData.append(`blocks[${indexBlocks}].sum4`, block.param4.summ);
                indexBlocks++;
            }
        }

        formData.append('lat', firstTabData.coordinates.lat);
        formData.append('lng', firstTabData.coordinates.lng);

        // Make a POST request to your backend using Axios
        axios.post('https://brixon-811bf88a933a.herokuapp.com/api/projects/create-project', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(response => {
                setShowModal(false)
                history('/home');
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }


    const [secondTabData, setSecondTabData] = useState({
        imageSrc: '',
        description: "",
        descriptionRu: "",
        imageFile: ""
    });
    const [thirdTabData, setThirdTabData] = useState({
        plans: {
            "Studio": 0,
            "1": 0,
            "2": 0,
            "3": 0,
            "4+": 0
        },
        data: {
            "Studio": [],
            "1": [],
            "2": [],
            "3": [],
            "4+": [],
        },
        selectedBedrooms: "Studio"
    });

    const [fourthTabData, setFourthTabData] = useState({
            imageSrc: {
                photo1: '',
                photo2: '',
                photo3: '',
                photo4: '',
                photo5: '',
                photo1File: '',
                photo2File: '',
                photo3File: '',
                photo4File: '',
                photo5File: ''
            },
            imageSrc1: {
                photo1: '',
                photo2: '',
                photo3: '',
                photo4: '',
                photo5: '',
                photo1File: '',
                photo2File: '',
                photo3File: '',
                photo4File: '',
                photo5File: ''
            }
        }
    )

    const [fifthData, setFifthData] = useState({
        data: {
            block1: {
                "image": "",
                "imageFile": "",
                "name": "",
                "desc": "",
                "nameRu": "",
                "descRu":""
            },
            block2: {
                "image": "",
                "imageFile": "",
                "name": "",
                "desc": "",
                "nameRu": "",
                "descRu":""
            },
            block3: {
                "image": "",
                "imageFile": "",
                "name": "",
                "desc": "",
                "nameRu": "",
                "descRu":""
            }
        }
    })
    const [sixData, setSixData] = useState({
        "Studio": {
            "param1": {"percent": 25, "summ": 0},
            "param2": {"percent": 25, "summ": 0},
            "param3": {"percent": 25, "summ": 0},
            "param4": {"percent": 25, "summ": 0},
        },
        "1": {
            "param1": {"percent": 25, "summ": 0},
            "param2": {"percent": 25, "summ": 0},
            "param3": {"percent": 25, "summ": 0},
            "param4": {"percent": 25, "summ": 0},
        },
        "2": {
            "param1": {"percent": 25, "summ": 0},
            "param2": {"percent": 25, "summ": 0},
            "param3": {"percent": 25, "summ": 0},
            "param4": {"percent": 25, "summ": 0},
        },
        "3": {
            "param1": {"percent": 25, "summ": 0},
            "param2": {"percent": 25, "summ": 0},
            "param3": {"percent": 25, "summ": 0},
            "param4": {"percent": 25, "summ": 0},
        },
        "4+": {
            "param1": {"percent": 25, "summ": 0},
            "param2": {"percent": 25, "summ": 0},
            "param3": {"percent": 25, "summ": 0},
            "param4": {"percent": 25, "summ": 0},
        }
    })


    const handleFirstTabDataChange = (updatedData) => {
        setFirstTabData(prevData => ({
            ...prevData,
            ...updatedData
        }));
    };

    const handleSecondTabDataChange = (updatedData) => {
        setSecondTabData(prevData => ({
            ...prevData,
            ...updatedData
        }));
    };
    const handleThirdTabDataChange = (updatedData) => {
        setThirdTabData(prevData => ({
            ...prevData,
            ...updatedData
        }));
    };
    const handleFourthTabDataChange = (updatedData) => {
        setFourthTabData(prevData => ({
            ...prevData,
            ...updatedData
        }));
    };

    const handleFifthTabDataChange = (updatedData) => {
        setFifthData(prevData => ({
            ...prevData,
            ...updatedData
        }));
    };
    const handleSixTabDataChange = (updatedData) => {
        setSixData(prevData => ({
            ...prevData,
            ...updatedData
        }));
    };
    const [currentPage, setCurrentPage] = useState(1)

    function isDataCompleteFirstTab(data) {
        const requiredFields = [
            'developer',
            'imageSrcMainFile',
            'selectedType',
            'selectedYear',
            'selectedProperty',
            'selectedMonth',
            'selectedBathroom',
            'selectedBedrooms',
            'selectedStatus',
            'projectName',
            'priceFrom',
            'sizeFrom',
        ];
        const allRequiredFieldsFilled = requiredFields.every(field => data[field] !== '');
        const locationFilled = data.selectedLocation !== '' || data.ownLocation !== '';
        const coordinatesNotEmpty = Object.keys(data.coordinates).length > 0;
        return allRequiredFieldsFilled && locationFilled && coordinatesNotEmpty;
    }

    function isDataCompleteThird(data) {
        const bedroomTypes = ["Studio", "1", "2", "3", "4+"];

        for (const bedroomType of bedroomTypes) {
            if (data.data[bedroomType]) {
                const bedroomDataArray = data.data[bedroomType];

                // Check if any object in the array has missing values
                const hasIncompleteData = bedroomDataArray.some(item => {
                    return !(
                        item.imgSrc &&
                        item.price &&
                        item.size &&
                        item.imageFile
                    );
                });

                // If any object in the selected bedroom has incomplete data, return false
                if (hasIncompleteData) {
                    return false;
                }
            }
        }

        return true; // All objects in all bedrooms have the required values
    }

    function isDataCompleteFourth(data) {
        const imageSrcFields = data.imageSrc;
        const imageSrc1Fields = data.imageSrc1;

        // Iterate over the keys in the imageSrc object
        for (const key in imageSrcFields) {
            if (!imageSrcFields[key]) {
                return false; // If any field in imageSrc is empty, return false
            }
        }

        // Iterate over the keys in the imageSrc1 object
        for (const key in imageSrc1Fields) {
            if (!imageSrc1Fields[key]) {
                return false; // If any field in imageSrc1 is empty, return false
            }
        }

        return true; // All fields are filled
    }

    function isDataCompleteFifth(data) {
        const blockFields = data.data;

        for (const block in blockFields) {
            const blockData = blockFields[block];

            // Iterate over the keys in the blockData object
            for (const key in blockData) {
                // Skip the 'descRu' field
                if (key === "descRu" || key === "nameRu") {
                    continue;
                }

                if (!blockData[key]) {
                    return false; // If any non-'descRu' field in blockData is empty, return false
                }
            }
        }

        return true; // All non-'descRu' fields in all blocks are filled
    }


    function handleNextPage() {
        switch (currentPage) {
            case 1 :
                if (!isDataCompleteFirstTab(firstTabData)) {
                    setShowModalNotAll(true);
                    return;
                } else {
                    setCurrentPage(currentPage + 1)
                    return;
                }
            case 2:
                if (secondTabData.imageSrc != "" && secondTabData.description != "") {
                    setCurrentPage(currentPage + 1)
                    return;
                } else {
                    setShowModalNotAll(true);
                    return;
                }
            case 3:
                if (!isDataCompleteThird(thirdTabData)) {
                    setShowModalNotAll(true);
                    return;
                } else {
                    setCurrentPage(currentPage + 1)
                    return;
                }
            case 4:
                if (!isDataCompleteFourth(fourthTabData)) {
                    setShowModalNotAll(true);
                    return;
                } else {
                    setCurrentPage(currentPage + 1)
                    return;
                }
            case 5:
                if(!isDataCompleteFifth(fifthData)){
                    setShowModalNotAll(true);
                    return;
                } else {
                    setCurrentPage(currentPage + 1)
                    return;
                }
            case 6:
                setCurrentPage(currentPage + 1)
                return;
            case 7:
                if (secondTabData.descriptionRu != "") {
                    setCurrentPage(currentPage + 1)
                    return;
                } else {
                    setShowModalNotAll(true);
                    return;
                }
        }
    }

    function handlePrevPage() {
        setCurrentPage(currentPage - 1)

    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',

        },
    }
    const modalStyles = {
        content: {
            width: '560px',
            height: '290px',
            borderRadius: '16px',
            margin: 'auto',
            display: 'flex',


            boxShadow: "0px 0px 8px 0px rgba(0, 0, 0, 0.15)"
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',// Adjust the opacity as needed
            zIndex: 999,
            backdropFilter: "blur(2px)"
        }
    };
    const buttonStyles = {
        borderRadius: '8px',
        background: '#407BFF',
        boxShadow: '0px 0px 6px 0px rgba(0, 0, 0, 0.20)',
        display: 'flex',
        width: '280px',
        padding: '12px 16px',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',

        color: '#FFF',
        textAlign: 'center',
        fontFamily: 'Montserrat',
        fontSize: '16px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: '20px',
        letterSpacing: '-0.5px',

    };
    return (
        <div className={"admin-container"}>
            <Header settings={false}/>
            <div className="admin-main-container">
                <div className="admin-pages" style={{justifyContent: currentPage === 1 && "flex-end"}}>
                    {currentPage !== 1 && <button className={"back"} onClick={() => handlePrevPage()}>Back</button>}
                    {currentPage !== 8 && <button onClick={() => handleNextPage()}>Continue</button>}
                    {currentPage === 8 && <button onClick={() => sendProjectDataToServer()}>Create</button>}
                </div>
                {currentPage === 1 && <AdminPage1 data={firstTabData} setFirstTabData={handleFirstTabDataChange}/>}
                {currentPage === 2 && <AdminPage2 data={secondTabData} setFirstTabData={handleSecondTabDataChange}/>}
                {currentPage === 3 && <AdminPage3 dataThird={thirdTabData} setFirstTabData={handleThirdTabDataChange}/>}
                {currentPage === 4 && <AdminPage4 data={fourthTabData} setFirstTabData={handleFourthTabDataChange}/>}
                {currentPage === 5 && <AdminPage5 dataFifth={fifthData} setFirstTabData={handleFifthTabDataChange}/>}
                {currentPage === 6 &&
                    <AdminPage6 dataThird={thirdTabData} data={sixData} setFirstTabData={handleSixTabDataChange}
                                setSixData={setSixData}/>}

                {currentPage === 7&&
                    <AdminPage7  data={secondTabData} showModalRu={showModalRu} setShowModalRu={setShowModalRu} setFirstTabData={handleSecondTabDataChange}/>}
                {currentPage === 8&&
                    <AdminPage8  dataFifth={fifthData} setFirstTabData={handleFifthTabDataChange}/>}

            </div>
            <Modal
                isOpen={showModalNotAll}
                style={modalStyles}
            >
                <div style={{paddingLeft: 66, paddingRight: 66, paddingTop: 39, width: "100%"}}>
                    <div className="logo-not-field"
                         style={{width: "100%", alignItems: "center", justifyContent: "center", display: "flex"}}>
                        <img src={notAll}/>
                    </div>
                    <span style={{
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: 20,
                        fontWeight: "400",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 15
                    }}>You have not filled in all fields</span>
                    <span style={{
                        color: "#AEAEB2",
                        fontFamily: "Montserrat, sans-serif",
                        fontSize: 15,
                        fontWeight: "400",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 15,
                        textAlign: "center"
                    }}>Read everything carefully again.</span>
                    <div className="button-not-all" style={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        justifyContent: 'center',
                        marginTop: 20
                    }}>
                        <button style={buttonStyles} onClick={() => setShowModalNotAll(false)}>Back</button>
                    </div>

                </div>
            </Modal>
            <Modal
                isOpen={showModal}
                style={customStyles}
                contentLabel="Loading Modal"
            >
                <div className="spinner" style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%"
                }}>

                    <HashLoader color="#407BFF"/>
                    <p style={{}}>Creating your project...</p>
                </div>

            </Modal>

        </div>
    );
}

export default AdminPanel;
