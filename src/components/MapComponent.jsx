import React, {useRef, useEffect, useState} from 'react';
import {GoogleMap, InfoWindow, Marker, useJsApiLoader} from '@react-google-maps/api';
import ProjectComponent from "./ProjectComponent.jsx";
import ico from "../assets/reset.svg"
const containerStyle = {
    width: '100%',
    height: '100%',
};

const center = {
    lat: 25.152033492170037,
    lng: 55.32550889425454,
};

const defaultZoom = 14;

function MapComponent({ projects, chosenCurrency }) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyC1bbvhODWGEsw_dUmk525DEu1ha9o1p9Y',
    });
    const [infoWindowVisible, setInfoWindowVisible] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const toggleInfoWindow = (marker) => {
        setSelectedMarker(marker);
        setInfoWindowVisible(!infoWindowVisible);
    };
    const customMarkerPath = `
    M 16.9998,17
    m -10.2,0
    a 10.2,10.2 0 1,0 20.4,0
    a 10.2,10.2 0 1,0 -20.4,0
    M 16.9998,17
    m -4.8,0
    a 4.8,4.8 0 1,0 9.6,0
    a 4.8,4.8 0 1,0 -9.6,0
  `;




    const svgMarker = {
        path: customMarkerPath,
        fillColor: 'transparent', // Transparent background
        fillOpacity: 1, // You can adjust this value to control the space
        scale: 1,
        strokeColor: '#407BFF',
        strokeWeight: 2,
    };

    const mapRef = useRef(null);

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
        }
    ];
    useEffect(() => {
        if (mapRef.current) {
            const map = mapRef.current;

            // Set the default zoom level
            map.setZoom(defaultZoom);
        }
    }, [defaultZoom]);


    function setMapToDefault() {
        if (mapRef.current) {
            const map = mapRef.current;
            map.setZoom(10);
            map.setCenter(center)
        }
    }

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            options={{ styles: customMapStyles }}
            onLoad={(map) => (mapRef.current = map)}
        >
            <div style={{position:"absolute",bottom:195,right:10,background: "white",
                boxShadow: "0px 0px 6px 0px rgba(0, 0, 0, 0.20)",borderRadius:9,width:40,height:40,cursor:"pointer",alignItems:"center",justifyContent:"center",display:"flex"}}
                onClick={()=>setMapToDefault()}
            >
                <img src={ico} style={{objectFit:"contain",width:"75%",height:"75%"}}/>

            </div>
            {projects  &&
                projects.map((project, index) => (
                    <Marker
                        key={index}
                        position={{ lat: Number(project.lat), lng: Number(project.lng) }}
                        icon={{
                            path: window.google.maps.SymbolPath.CIRCLE,
                            fillColor: 'transparent',
                            fillOpacity: 1,
                            scale: 8,
                            strokeColor: '#407BFF',
                            strokeWeight: 2
                        }}
                        onClick={() => toggleInfoWindow(project)}
                    >
                        {infoWindowVisible && selectedMarker === project && (
                            <InfoWindow  position={{ lat: Number(project.lat) - 0.0005, lng: Number(project.lng) + 0.0014 }}>
                                <ProjectComponent project={project} chosenCurrency={chosenCurrency}  />
                            </InfoWindow>
                        )}
                    </Marker>
                ))}
        </GoogleMap>
    ) : (
        <></>
    );
}

export default MapComponent; // Wrap the component with withRouter
