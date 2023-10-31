import React, { useState, useRef } from 'react';
import Header from "../components/Header.jsx";
import "../styles/admin.css";
import add from "../assets/add.png";
import search from "../assets/Search.png"
import map from "../assets/map.png"
import Select from 'react-select';
import locations from '../helps/Locations.jsx';
import Modal from "react-modal";
import GoogleMapReact from "google-map-react";
import {Store} from "react-notifications-component"; // Adjust the path accordingly



const AdminPanel = ({data,setFirstTabData}) => {
    const fileInputRef = useRef(null);
    const fileInputRefMain = useRef(null);
    const defaultProps = {
        center: {
            lat:  25.152033492170037,
            lng: 55.32550889425454
        },
        zoom: 10
    };
    const customMapStyles = [
        {
            "elementType": "labels.text",
            "stylers": [
                {
                    "color": "#878787"
                }
            ]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative.land_parcel",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "administrative.neighborhood",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "landscape",
            "stylers": [
                {
                    "color": "#f9f5ed"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi.business",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "stylers": [
                {
                    "color": "#f5f5f5"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#c9c9c9"
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.local",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "stylers": [
                {
                    "color": "#aee0f4"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },

    ];
    const modalStyles = {
        content: {
            width: '930px',
            height: '530px',
            borderRadius: '16px',
            margin: 'auto',
            display: 'flex',
            zIndex: 1000
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)' ,// Adjust the opacity as needed
            zIndex: 999
        }
    };
    const customStyles = {
        control: (provided) => ({
            ...provided,
            width: '100%',
            border:"none",
            color: '#AEAEB2',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '20px',
            letterSpacing: '-0.5px',
            borderRadius: '8px', // Added border-radius
            background: 'var(--D-grey, #F2F2F7)', // Added background
        }),
    };
    const [mapVisible,setMapVisible] = useState(false)
    const { lat, lng } = data.coordinates;
    const coordinatesString = data.coordinates
        ? `lat: ${data.coordinates.lat !== undefined ? data.coordinates.lat : ''}, lng: ${data.coordinates.lng !== undefined ? data.coordinates.lng : ''}`
        : 'Coordinates not available';
    const handleStatusChange = (status) => {

       setFirstTabData( { "selectedStatus": status })
    };
    const handleYearChange = (event) => {

        setFirstTabData( { "selectedYear": event.target.value })
    };
    const handleMongthChange = (event) => {

        setFirstTabData( { "selectedMonth": event.target.value })
    };
    const generateYearOptions = () => {

        const years = [];

        // Add the "Choose a year" option
        years.push(
            <option key="placeholder" value="" disabled>
                20__
            </option>
        );

        for (let year = 2017; year <= 2032; year++) {
            const displayYear = year.toString().slice(-2); // Get the last two digits of the year
            years.push(
                <option key={year} value={displayYear}>
                    {`20${displayYear}`}
                </option>
            );
        }

        return years;
    };
    const handleImageClick = () => {

        fileInputRef.current.click();
    };
    const handleImageClickMain = () => {
        // Trigger a click on the file input
        fileInputRefMain.current.click();
    };
    const handleFileChangeMain = (event) => {
        const file = event.target.files[0];

        if (file && file.size <= 1048576) { // Check if the file exists and is within the size limit (1MB)
            const reader = new FileReader();
            setFirstTabData({ "imageSrcMainFile": file });

            reader.onload = (e) => {
                setFirstTabData({ "imageSrcMain": e.target.result });
            };

            reader.readAsDataURL(file);
        } else {
            Store.addNotification({
                title: "File Size Exceeded",
                message: "Please select a file smaller than 1MB.",
                type: "warning",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__flipInY"],
                animationOut: ["animate__animated", "animate__flipOutX"],
                dismiss: {
                    duration: 5000
                }
            });
        }
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const maxSize = 500 * 1024; // 500KB

        if (file && file.size <= maxSize) {
            const reader = new FileReader();
            setFirstTabData({ "imageSrcFile": file });

            reader.onload = (e) => {
                setFirstTabData({ "imageSrc": e.target.result });
            };

            reader.readAsDataURL(file);
        } else {
            Store.addNotification({
                title: "File Size Exceeded",
                message: "Please select a file smaller than 1MB.",
                type: "warning",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__flipInY"],
                animationOut: ["animate__animated", "animate__flipOutX"],
                dismiss: {
                    duration: 5000
                }
            });
        }
    };
    const handleBathroomChange = (bathroom) => {

        setFirstTabData( { "selectedBathroom":bathroom })
    };
    const handleBedroomsChange = (bedrooms) => {

        setFirstTabData( { "selectedBedrooms":bedrooms })
    };
    const handleTypeChange = (type) => {
        setFirstTabData( { "selectedType":type })
    };
    const handleCompletionChange = (type) => {
        setFirstTabData( { "selectedProperty":type })
    };


    const handleSelectChangeFrom = (selectedOption) => {
        setFirstTabData({selectedLocation:selectedOption?.value})
        setFirstTabData({ownLocation:""})
    };
    const handleMapClick = ({ lat, lng }) => {

        setFirstTabData({coordinates:{ lat, lng }})
       setMapVisible(false)
    };
    function formatNumberWithCommas(value) {
        // Remove existing commas, format, and add a single comma
        return value.replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return (
        <div className={"admin-container"}>


                <div className="block1">
                    <div className="choose-logo-container">
                        <div className="admin-title">
                            Developer
                        </div>
                        <div className="choose-logo-block">
                            <input className={"admin-location-input"}
                                   value={data.developer}
                                   onChange={(event) => {
                                       const { value } = event.target;  // Get the value from the input
                                       setFirstTabData({developer:value})
                                   }}
                                   placeholder={"Type here"}/>                        </div>
                    </div>
                    <div className="admin-location-block">
                        <div className="admin-location-container">
                            <div className="admin-title">Location</div>
                            <div className="admin-location-find" style={{paddingRight:0}}>
                                <Select styles={customStyles}
                                        value={locations.find((option) => option.value === data.selectedLocation)}
                                            className={"admin-location-input"} options={locations}
                                placeholder={"Type here"}

                                        onChange={handleSelectChangeFrom}
                                />
                            </div>


                        </div>
                        <div className="admin-popular-location-block">

                <div className="admin-title">Write your own location</div>
                            <div className="admin-location-find">
                           <input className={"admin-location-input"} disabled={data.selectedLocation!=""} value={data.ownLocation}
                                  onChange={(event) => {
                                      const { value } = event.target;  // Get the value from the input
                                      setFirstTabData({ownLocation:value})
                                  }}
                                  placeholder={"Type here"} />
                            </div>
                        </div>
                    </div>
                    <div className="admin-name-location-block">
                        <div className="admin-project-name">
                            <div className="admin-title">
                                Project Name
                            </div>
                            <input className={"admin-location-input"}
                                   value={data.projectName}
                                   onChange={(event) => {
                                       const { value } = event.target;  // Get the value from the input
                                       setFirstTabData({projectName:value})
                                   }}
                                   placeholder={"Type here"}/>
                        </div>
                        <div className="admin-location-container">
                            <div className="admin-title">Choose project location</div>
                            <div className="admin-location-find">
                                <input className={"admin-location-input"} value={coordinatesString} placeholder={"Open map"}/>
                                <img src={map} onClick={()=>setMapVisible(true)}/>
                            </div>


                        </div>
                    </div>
                    <div className="admin-project-type">
                        <div className="admin-title">
                            Select Project Type
                        </div>
                        <div className="buttons-block">
                            <button
                                onClick={() => handleTypeChange('Project for investment')}
                                className={data['selectedType'] === 'Project for investment' ? 'active' : ''}
                                style={{width:162}}
                            >
                                Project for investment

                            </button>
                            <button
                                onClick={() => handleTypeChange('Project for self-use')}
                                className={data['selectedType'] === 'Project for self-use' ? 'active' : ''}
                            >
                                Project for self-use

                            </button>
                        </div>
                    </div>
                </div>
                <div className="block2">
                    <div className="main-foto-block">
                        <div className="admin-title">
                            Main photo (max 1MB)
                        </div>
                        <div className="choose-logo-block"  onClick={handleImageClickMain}>
                            <img src={data.imageSrcMain || add} alt="Click to choose a file" style={{width:!data.imageSrcMain&&"44px",height:!data.imageSrcMain&&"44px"}} />
                        </div>
                        <input
                            type="file"
                            ref={fileInputRefMain}
                            style={{ display: 'none' }}
                            onChange={handleFileChangeMain}
                        />
                    </div>
                    <div className="admin-size-price-block">
                        <div className="admin-price-block">
                            <div className="admin-title">
                                Price from
                            </div>
                            <div className="admin-input-text">
                                <input placeholder={"Type here"}
                                       value={formatNumberWithCommas(data.priceFrom)}
                                       onChange={(event) => {
                                           const { value } = event.target;  // Get the value from the input
                                           setFirstTabData({priceFrom:value})
                                       }}
                                />
                                <span>AED</span>
                            </div>
                        </div>
                        <div className="admin-size-block">
                            <div className="admin-title">
                                Property size
                            </div>
                            <div className="admin-input-text">
                                <input placeholder={"Type here"}
                                       value={data.sizeFrom}
                                       onChange={(event) => {
                                           const { value } = event.target;  // Get the value from the input
                                           setFirstTabData({sizeFrom:value})
                                       }}
                                />
                                <span>sq.ft</span>
                            </div>
                        </div>
                        <div className="admin-handover-block">
                            <div className="admin-title">
                                Handover
                            </div>
                            <div className="handover-input-block">
                                <select id="monthSelect"  value={data.selectedMonth} onChange={handleMongthChange}>
                                    <option value="1">01</option>
                                    <option value="2">02</option>
                                    <option value="3">03</option>
                                    <option value="4">04</option>
                                </select>
                                <div className="handover-text">
                                    Q
                                </div>
                                <select id="yearSelect" value={data.selectedYear} onChange={handleYearChange}>
                                    {generateYearOptions()}
                                </select>
                                <div className="admin-title">Year</div>
                            </div>

                        </div>
                    </div>
                    <div className="admin-bed-bath-status">
                        <div className="admin-bed-bath">
                            <div className="admin-bath">
                                <div className="admin-title">
                                    Bathrooms
                                </div>
                                <div className="multiple-buttons-container" style={{marginBottom:16}}>
                                    <button onClick={()=>handleBathroomChange("Auto")} className={`multiple-button ${data.selectedBathroom === 'Auto' ? 'active' : ''}`}>Auto</button>
                                    <button onClick={()=>handleBathroomChange("1")}  className={`multiple-button ${data.selectedBathroom === '1' ? 'active' : ''}`}>1</button>
                                    <button onClick={()=>handleBathroomChange("2")}  className={`multiple-button ${data.selectedBathroom === '2' ? 'active' : ''}`}>2</button>
                                    <button onClick={()=>handleBathroomChange("3")}  className={`multiple-button ${data.selectedBathroom === '3' ? 'active' : ''}`}>3</button>
                                    <button onClick={()=>handleBathroomChange("4+")} className={`multiple-button ${data.selectedBathroom === '4+' ? 'active' : ''}`}
                                    >4+</button>
                                </div>
                            </div>
                            <div className="admin-bed">
                                <div className="admin-title">
                                    Bedrooms
                                </div>
                                <div className="multiple-buttons-container">
                                    <button onClick={()=>handleBedroomsChange("Studio")} className={`multiple-button ${data.selectedBedrooms === 'Studio' ? 'active' : ''}`}>Studio</button>
                                    <button onClick={()=>handleBedroomsChange("1")}  className={`multiple-button ${data.selectedBedrooms === '1' ? 'active' : ''}`}>1</button>
                                    <button onClick={()=>handleBedroomsChange("2")}  className={`multiple-button ${data.selectedBedrooms === '2' ? 'active' : ''}`}>2</button>
                                    <button onClick={()=>handleBedroomsChange("3")}  className={`multiple-button ${data.selectedBedrooms === '3' ? 'active' : ''}`}>3</button>
                                    <button onClick={()=>handleBedroomsChange("4+")} className={`multiple-button ${data.selectedBedrooms === '4+' ? 'active' : ''}`}
                                    >4+</button>
                                </div>
                            </div>
                        </div>
                        <div className="admin-completion-status">
                            <div className="admin-title">
                                Completion status
                            </div>
                            <div className="buttons-block">
                                <button
                                    onClick={() => handleStatusChange('Any')}
                                    className={data["selectedStatus"] === 'Any' ? 'active' : ''}
                                >
                                    Any
                                </button>
                                <button
                                    onClick={() => handleStatusChange('Off-Plan')}
                                    className={data["selectedStatus"] === 'Off-Plan' ? 'active' : ''}
                                    style={{
                                        width:128,height:36,padding:0
                                    }}
                                >
                                    Off-Plan
                                </button>
                                <button
                                    onClick={() => handleStatusChange('Ready')}
                                    className={data.selectedStatus === 'Ready' ? 'active' : ''}
                                >
                                    Ready
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="completion-status-block">
                    <div className="admin-title">
                        Property Type
                    </div>
                    <div className="completion-buttons">
                        <div className="buttons-block">
                            <button
                                onClick={() => handleCompletionChange('Apartments')}
                                className={data.selectedProperty === 'Apartments' ? 'active' : ''}
                                style={{width:157}}
                            >
                                Apartments
                            </button>
                            <button
                                onClick={() => handleCompletionChange('Villa')}
                                className={data.selectedProperty === 'Villa' ? 'active' : ''}
                            >
                                Villa
                            </button>
                        </div>
                        <div className="buttons-block">
                            <button
                                onClick={() => handleCompletionChange('Town house')}
                                className={data.selectedProperty === 'Town house' ? 'active' : ''}
                                style={{width:162}}
                            >
                                Town house
                            </button>
                            <button
                                onClick={() => handleCompletionChange('Land')}
                                className={data.selectedProperty === 'Land' ? 'active' : ''}
                            >
                                Land
                            </button>
                        </div>
                    </div>

                </div>

            <Modal
                isOpen={mapVisible}
                style={modalStyles}
                contentLabel="Select a Point"
            >
                <div style={{ height: '100%', width: '100%' }}>
                    <GoogleMapReact

                        bootstrapURLKeys={{ key: "AIzaSyC1bbvhODWGEsw_dUmk525DEu1ha9o1p9Y" }}
                        defaultCenter={defaultProps.center}
                        defaultZoom={defaultProps.zoom}
                        yesIWantToUseGoogleMapApiInternals
                        onClick={handleMapClick}
                        options={{ styles: customMapStyles }}
                    />
                </div>

            </Modal>
        </div>
    );
}

export default AdminPanel;
