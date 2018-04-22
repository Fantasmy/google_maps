'use strict';

function main () {
  // -- utility functions

  function getUserLocation () {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const userPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          resolve(userPosition);
        }, () => {
          resolve();
          // console.log('Error in the geolocation service.');
        });
      } else {
        resolve();
        // console.log('Browser does not support geolocation.');
      }
    });
  }

  // -- add marker

  function addMarker (map, location, title) {
    const markerOptions = {
      position: location,
      title: title
    };
    const marker = new google.maps.Marker(markerOptions);
    marker.setMap(map);
    return marker;
  }

  // -- build the map

  const defaultLocation = {
    lat: 41.3977381,
    lng: 2.190471916
  };
  const container = document.getElementById('map');
  const options = {
    zoom: 15,
    center: defaultLocation
  };
  const map = new google.maps.Map(container, options);

  axios.get('/spots/json')
    .then(response => {
      response.data.forEach((spot) => {
        const location = {
          lat: spot.location.coordinates[0],
          lng: spot.location.coordinates[1]
        };
        addMarker(map, location, spot.name);
      });
    });

  getUserLocation()
    .then((location) => {
      if (location) {
        addMarker(map, location, 'your location');
      }
    });
}

window.addEventListener('load', main);
