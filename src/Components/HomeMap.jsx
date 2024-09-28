import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import { useRouter } from 'next/router';
// Fix for missing marker icons in Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Component to handle route
const Routing = ({ start, end }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // Create the routing control
    const routingControl = L.Routing.control({
      waypoints: [L.latLng(start[0], start[1]), L.latLng(end[0], end[1])],
      lineOptions: {
        styles: [{ color: 'blue', weight: 4 }], // Customize route line style
      },
      createMarker: function () { return null; }, // Hide default route markers
      routeWhileDragging: false, // Disable route updating while dragging
      showAlternatives: true,  // Show alternative routes
      draggableWaypoints: false, // Disable dragging of waypoints
      addWaypoints: false, // Disable adding more waypoints
    }).addTo(map);

    // Function to style both primary and alternative route instructions
    const styleRoutingInstructions = () => {
      const routeInstructionsContainers = document.querySelectorAll('.leaflet-routing-container');

      routeInstructionsContainers.forEach(container => {
        container.style.backgroundColor = "rgb(54,110,254)";
        container.style.padding = '10px';
        container.style.borderRadius = '8px';
        container.style.fontFamily = 'Arial, sans-serif';
        container.style.color = '#fff';
        container.style.width = '250px';
        container.style.maxHeight = '150px';  // Set a max height for long instructions
        container.style.overflowY = 'auto';  // Enable scrolling if content exceeds max height
      });
    };

    // Function to hide/show instructions based on screen size
    const handleResize = () => {
      const routeInstructionsContainers = document.querySelectorAll('.leaflet-routing-container');
      routeInstructionsContainers.forEach((container, index) => {
        if (index === 0) {
          // Only show the first route instruction container
          container.style.display = 'block';
        } else {
          // Hide all other route instruction containers
          container.style.display = 'none';
        }});
    };

    // Apply styles initially and set resize event listener
    styleRoutingInstructions();
    handleResize();
    window.addEventListener('resize', handleResize);

    // Cleanup function to remove event listener and control
    return () => {
      if (map.hasLayer(routingControl)) {
        map.removeControl(routingControl);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [map, start, end]);

  return null;
};

const HomeMap = ({page}) => {
  console.log(page)
  // Dummy coordinates for the start and end points
  const startPoint = [51.505, -0.09];
  const endPoint = [51.515, -0.1];
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };



  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className='relative w-full px-4 flex justify-center  md:w-full h-full'
      style={{ height: page === 'home' ? '450px' : '500px' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={ ` w-full md:w-max text-xl absolute top-0 left-1/3 transform -translate-x-1/2 bg-white rounded-xl md:text-3xl font-bold px-4 py-2 z-20 text-center transition-opacity duration-300 ease-in-out ml-20
          ${isHovered ? 'opacity-0 ml-30' : 'opacity-100 mr-20'}`}
        style={{ color: "rgb(54,110,254)" }}
      >
        Best Travel Article / Route
      </div> 

      {/* Map container with blur effect */}
      <div
        className={`relative w-full h-full filter ${page==='home'?'blur-sm':'blur-none' } transition-blur duration-500 ease-in-out hover:filter-none`}
      >
        <MapContainer center={startPoint} zoom={13} style={{ height:'100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Start Marker */}
          <Marker position={startPoint}>
            <Popup>Starting Point</Popup>
          </Marker>

          {/* End Marker */}
          <Marker position={endPoint}>
            <Popup>End Point</Popup>
          </Marker>

          {/* Add routing between the two markers */}
          <Routing start={startPoint} end={endPoint} />
        </MapContainer>
      </div>
    </div>
  );
};

export default HomeMap;
