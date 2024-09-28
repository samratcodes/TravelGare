import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import './Map.css';
import { FaMapPin } from "react-icons/fa";

// Reset Leaflet's icon paths to use the default marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const MapInput = ({ onPositionsChange }) => { // Accept the prop here
  const [currentPosition, setCurrentPosition] = useState(null);
  const [clickedPosition, setClickedPosition] = useState(null);
  const [settingInitialLocation, setSettingInitialLocation] = useState(false);
  const routingControlRef = useRef(null);

  // Get user's current location or allow manual setting
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition([latitude, longitude]);
        },
        () => {
          console.warn('Geolocation not available. Please set the initial location manually.');
        },
        { enableHighAccuracy: true }
      );
    }
  }, []);

  const RoutingMachine = () => {
    const map = useMapEvents({
      click(e) {
        if (settingInitialLocation) {
          setCurrentPosition([e.latlng.lat, e.latlng.lng]);
          setSettingInitialLocation(false);  // Stop setting initial position after it's set
        } else {
          setClickedPosition([e.latlng.lat, e.latlng.lng]);
        }
      },
    });

    useEffect(() => {
      if (currentPosition && clickedPosition) {
        const positions = {
          currentPosition,
          clickedPosition,
        };
        onPositionsChange(positions); // Call the passed callback to update the parent state
      }

      if (!currentPosition || !clickedPosition) return;

      if (routingControlRef.current) {
        try {
          routingControlRef.current.getPlan().setWaypoints([]);  // Clear waypoints
          map.removeControl(routingControlRef.current);  // Remove existing control
        } catch (error) {
          console.warn('Error resetting waypoints:', error);
        }
      }

      routingControlRef.current = L.Routing.control({
        waypoints: [L.latLng(currentPosition), L.latLng(clickedPosition)],
        routeWhileDragging: true,
        lineOptions: {
          styles: [{ color: 'blue', weight: 5, opacity: 0.8 }],
        },
      }).addTo(map);

      return () => {
        if (routingControlRef.current) {
          map.removeControl(routingControlRef.current);  // Clean up routing control on unmount
        }
      };
    }, [currentPosition, clickedPosition, map, onPositionsChange]);

    return null;
  };

  const CenterOnCurrentPosition = () => {
    const map = useMap();

    useEffect(() => {
      if (currentPosition) {
        map.setView(currentPosition, map.getZoom());
      }
    }, [currentPosition, map]);

    return null;
  };

  const SearchControl = () => {
    const map = useMap();

    useEffect(() => {
      const provider = new OpenStreetMapProvider();

      const searchControl = new GeoSearchControl({
        provider,
        style: 'bar',
        showMarker: false,
        showPopup: false,
        autoClose: true,
        retainZoomLevel: false,
        searchLabel: 'Search for final location...',
        keepResult: true,
      });

      map.addControl(searchControl);

      setTimeout(() => {
        const button = document.querySelector('.geosearch-button');
        if (button) {
          button.innerHTML = '<i class="fas fa-search"></i>';
          button.style.display = 'flex';
          button.style.alignItems = 'center';
          button.style.justifyContent = 'center';
        }
      }, 0);

      map.on('geosearch/showlocation', (result) => {
        const { location } = result;
        setClickedPosition([location.y, location.x]);
      });

      return () => map.removeControl(searchControl);
    }, [map]);

    return null;
  };

  // Handler for setting or changing initial location
  const handleSetInitialLocation = () => {
    setSettingInitialLocation(true);
    alert(currentPosition ? 'Click on the map to change your initial location.' : 'Click on the map to set your initial location.');
  };

  return (
    <div className='mt-32'>
      {/* Buttons outside the map container */}
      <div style={{ marginBottom: '20px', textAlign: 'center' }}>
        <button
          onClick={handleSetInitialLocation}
          className="set-location-btn"
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          {currentPosition ? <div className='flex items-center'>Change Initial Location <FaMapPin/></div> :
          <div className='flex items-center'> Set Initial Location <FaMapPin/></div>}
        </button>
      </div>

      <MapContainer center={currentPosition || [51.505, -0.09]} zoom={13} style={{ height: '30rem', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {currentPosition && (
          <Marker position={currentPosition}>
            <Popup>Your starting point</Popup>
          </Marker>
        )}
        {clickedPosition && (
          <Marker position={clickedPosition}>
            <Popup>Destination</Popup>
          </Marker>
        )}
        <CenterOnCurrentPosition />
        <RoutingMachine /> {/* Remove onPositionsChange from here since it's being handled in RoutingMachine */}
        <SearchControl />
      </MapContainer>
    </div>
  );
};

export default MapInput;
