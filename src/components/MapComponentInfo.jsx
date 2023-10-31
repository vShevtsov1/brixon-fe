import React, {useRef, useEffect} from 'react';
import {GoogleMap, Marker, useJsApiLoader} from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '100%',
};

const center = {
    lat: 25.152033492170037,
    lng: 55.32550889425454,
};

const defaultZoom = 10;

function MapComponentInfo(markerCenter) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyC1bbvhODWGEsw_dUmk525DEu1ha9o1p9Y',
    });


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
    ]
    useEffect(() => {
        if (mapRef.current) {
            const map = mapRef.current;

            // Set the default zoom level
            map.setZoom(defaultZoom);
        }
    }, [defaultZoom]);



    console.log(markerCenter)
    return isLoaded && markerCenter!=null ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            options={{ styles: customMapStyles }}
            onLoad={(map) => (mapRef.current = map)}
        >
        <Marker position={{ lat: Number(markerCenter.markerCenter.lat), lng: Number(markerCenter.markerCenter.lng) }}   icon={{
            path: window.google.maps.SymbolPath.CIRCLE,
            fillColor: 'transparent',
            fillOpacity: 1,
            scale: 8,
            strokeColor: '#407BFF',
            strokeWeight: 2
        }}/>


        </GoogleMap>
    ) : (
        <></>
    );
}

export default MapComponentInfo;