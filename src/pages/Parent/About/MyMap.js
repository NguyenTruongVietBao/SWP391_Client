import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, useGoogleMap } from '@react-google-maps/api';

const libraries = ['places']; // Add other libraries if needed

const mapContainerStyle = {
    height: '400px',
    width: '100%',
};

const center = {
    lat: 0,
    lng: 0,
};

const MyMap = () => {
    const [address, setAddress] = useState('');
    const [map, setMap] = useState(null);

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY', // Replace with your API key
        libraries,
    });

    const onLoad = (map) => {
        setMap(map);
    };

    useEffect(() => {
        if (map) {
            // Use browser's geolocation API to get current location
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const geocoder = new window.google.maps.Geocoder();
                    const latLng = new window.google.maps.LatLng(latitude, longitude);

                    geocoder.geocode({ location: latLng }, (results, status) => {
                        if (status === 'OK' && results[0]) {
                            setAddress(results[0].formatted_address);
                            map.setCenter(latLng);
                        } else {
                            console.error('Geocoder failed due to: ' + status);
                        }
                    });
                },
                (error) => {
                    console.error('Geolocation error:', error);
                }
            );
        }
    }, [map]);

    if (loadError) return <div>Error loading maps</div>;
    if (!isLoaded) return <div>Loading...</div>;

    return (
        <div>
            <div style={mapContainerStyle}>
                <GoogleMap
                    onLoad={onLoad}
                    mapContainerStyle={mapContainerStyle}
                    center={center}
                    zoom={10}
                />
            </div>
            <p>Current Address: {address}</p>
        </div>
    );
};

export default MyMap;
