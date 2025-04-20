// Global variables for maps
let projectMap = null;
let activityMap = null;
let verifyMap = null;
let currentMarker = null;

// Initialize maps when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeMaps();
});

// Initialize all maps
function initializeMaps() {
    // Initialize project map if element exists
    const projectMapElement = document.getElementById('project-map');
    if (projectMapElement) {
        projectMap = initializeMap('project-map', true);
    }

    // Initialize activity map if element exists
    const activityMapElement = document.getElementById('activity-map');
    if (activityMapElement) {
        activityMap = initializeMap('activity-map', true);
    }

    // Initialize verify map if element exists
    const verifyMapElement = document.getElementById('verify-map');
    if (verifyMapElement) {
        verifyMap = initializeMap('verify-map', false);
    }
}

// Initialize a single map
function initializeMap(elementId, clickable = false) {
    const map = L.map(elementId).setView([-1.286389, 36.817223], 10); // Default center on Nairobi

    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        maxZoom: 18
    }).addTo(map);

    if (clickable) {
        map.on('click', function(e) {
            handleMapClick(map, e);
        });
    }

    return map;
}

// Handle map clicks
function handleMapClick(map, e) {
    const lat = e.latlng.lat.toFixed(6);
    const lng = e.latlng.lng.toFixed(6);
    
    // Remove existing marker if any
    if (currentMarker) {
        map.removeLayer(currentMarker);
    }
    
    // Add new marker
    currentMarker = L.marker(e.latlng).addTo(map);
    
    // Update coordinates in form
    const coordinates = `${lat},${lng}`;
    if (map === projectMap) {
        document.getElementById('project-coordinates').value = coordinates;
    } else if (map === activityMap) {
        document.getElementById('activity-coordinates').value = coordinates;
    }
}

// Display project location on map
function showProjectLocation(coordinates, map = projectMap) {
    if (!map || !coordinates) return;
    
    const [lat, lng] = coordinates.split(',').map(Number);
    if (!lat || !lng) return;
    
    // Remove existing marker
    if (currentMarker) {
        map.removeLayer(currentMarker);
    }
    
    // Add new marker
    currentMarker = L.marker([lat, lng]).addTo(map);
    map.setView([lat, lng], 13);
}

// Display activity location on map
function showActivityLocation(coordinates, map = activityMap) {
    if (!map || !coordinates) return;
    
    const [lat, lng] = coordinates.split(',').map(Number);
    if (!lat || !lng) return;
    
    // Remove existing marker
    if (currentMarker) {
        map.removeLayer(currentMarker);
    }
    
    // Add new marker
    currentMarker = L.marker([lat, lng]).addTo(map);
    map.setView([lat, lng], 15);
}

// Display verification location on map
function showVerificationLocation(coordinates) {
    if (!verifyMap || !coordinates) return;
    
    const [lat, lng] = coordinates.split(',').map(Number);
    if (!lat || !lng) return;
    
    // Remove existing marker
    if (currentMarker) {
        verifyMap.removeLayer(currentMarker);
    }
    
    // Add new marker
    currentMarker = L.marker([lat, lng]).addTo(verifyMap);
    verifyMap.setView([lat, lng], 15);
}

// Get current location
function getCurrentLocation(map) {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            
            if (currentMarker) {
                map.removeLayer(currentMarker);
            }
            
            currentMarker = L.marker([lat, lng]).addTo(map);
            map.setView([lat, lng], 15);
            
            // Update coordinates in form
            const coordinates = `${lat.toFixed(6)},${lng.toFixed(6)}`;
            if (map === projectMap) {
                document.getElementById('project-coordinates').value = coordinates;
            } else if (map === activityMap) {
                document.getElementById('activity-coordinates').value = coordinates;
            }
        }, function(error) {
            console.error("Error getting location:", error);
        });
    }
}

// Reset map view
function resetMap(map) {
    if (!map) return;
    
    if (currentMarker) {
        map.removeLayer(currentMarker);
    }
    
    map.setView([-1.286389, 36.817223], 10); // Reset to Nairobi
    currentMarker = null;
    
    // Clear coordinates in form
    if (map === projectMap) {
        document.getElementById('project-coordinates').value = '';
    } else if (map === activityMap) {
        document.getElementById('activity-coordinates').value = '';
    }
}



