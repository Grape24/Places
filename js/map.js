'use strict'

var map, infoWindow, marker;

function init(){ 
    renderPlaces();
    initMap();
}

function initMap() {
    var eilat = {lat: 29.556069, lng: 34.951831},
        map = new google.maps.Map(document.getElementById('map'), {
            center: eilat,
            zoom: 15,
         });
         map.addListener('click', function(e){
           addMarker(e.latLng, map)
         });
         
         renderLocationBtn();   
}




function renderLocationBtn(){
    let elMap = document.getElementById('map');
    let elBtn = document.createElement('I');
    elBtn.addEventListener('click', viewUserLocation)
    elBtn.classList.add('fas');
    elBtn.classList.add('fa-crosshairs');
    //let strHTML = `<i onclick="viewUserLocation()" class="fas fa-crosshairs"></i>`
    elMap.appendChild(elBtn);
}



function viewUserLocation(){
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 29.556069, lng: 34.951831},
        zoom: 15,
      });

    infoWindow = new google.maps.InfoWindow;
    if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
  renderLocationBtn();
  onMarkLocation();

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Error: The Geolocation service failed.' :
                        'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}


function addMarker(location, map) {
    new google.maps.Marker({
        position: location,
        icon: 'https://img.icons8.com/dusk/64/000000/place-marker--v1.png',
        map: map
    });
    map.panTo(location);
    let coords = {lat: location.lat(), lng: location.lng()};
    addPlace('No title given', 'No description given', coords);
    renderInputs(coords);
}

function onMarkLocation(){
    google.maps.event.addListener(map, 'click', function(event) {
        addMarker(event.latLng, map);
    });
}


function renderInputs(){
  let elContainer = document.querySelector('.place-input');
  let strHTML = `<label for="title"></label>
                  <input type="text" name="title" placeholder="What is the place name?">
                  <label for="desc"></label>
                  <input type="text" name="desc" placeholder="What is the place description?">
                  <button onclick="onPlaceSubmit()" type="submit">Enter</button>`
  elContainer.innerHTML = strHTML;
}

function renderPlaces(){
  let places = loadPlacesFromStorage();
  places.map(function(place){
    let elPlace = document.createElement('DIV');
    elPlace.classList.add('place');
    elPlace.classList.add('flex');
    elPlace.setAttribute('data-id', place.id);
    elPlace.addEventListener('click', onGoToLocation);
    let elPlaceContainer = document.querySelector('.places-container');
    elPlaceContainer.appendChild(elPlace);
    let strHTML = `
    <img src="https://img.icons8.com/dusk/64/000000/place-marker--v1.png" alt="mark"> 
      <div class="place-text-container flex">
        <div class="title">${place.placeTitle}</div>
        <div class="desc">${place.placeDesc}</div>
      </div>
      <div class="button-container flex">
        <button onclick="onRemovePlace(this) "class="remove flex">X</button>
      </div>`
    elPlace.innerHTML = strHTML;
  })
}

function onPlaceSubmit(){
  let elPlaceInput = document.querySelector("[name='title']");
  let elPlaceValue = elPlaceInput.value;
  let elDescInput = document.querySelector("[name='desc']");
  let elDescValue = elDescInput.value;
  let elPlace = document.createElement('DIV');
  elPlace.classList.add('place');
  elPlace.classList.add('flex');
  elPlace.setAttribute('data-id', gNextId-1);
  elPlace.addEventListener('click', onGoToLocation);
  let elPlaceContainer = document.querySelector('.places-container');
  elPlaceContainer.appendChild(elPlace);
  let strHTML = `
                  <img src="https://img.icons8.com/dusk/64/000000/place-marker--v1.png" alt="mark"> 
                    <div class="place-text-container flex">
                      <div class="title">${elPlaceValue}</div>
                      <div class="desc">${elDescValue}</div>
                    </div>
                    <div class="button-container flex">
                      <button onclick="onRemovePlace(this)" class="remove flex">X</button>
                    </div>`
  elPlace.innerHTML = strHTML;
  updatePlaceById(elPlaceValue, elDescValue, gNextId-1);

}

function onRemovePlace(elDiv){
  let elPlace = elDiv.parentElement.parentElement;
  let idx = elPlace.attributes[1].value;
  elPlace.style.display = 'none';
  removePlaceById(idx);
}

function onGoToLocation(){
  let elDiv = this;
  let idx = elDiv.dataset.id;
  idx = +idx;
  let coords = findCoordsById(idx);
  let title = findPlaceNameById(idx);
  map = new google.maps.Map(document.getElementById('map'), {
    center: coords,
    zoom: 19,
  });
  let infoWindow = new google.maps.InfoWindow({
    content: title,
    position: coords
  });

  let marker = new google.maps.Marker({
    position: coords,
    map: map,
    icon: 'https://img.icons8.com/dusk/64/000000/place-marker--v1.png',
    title: title
  });

  infoWindow.open(map, marker);

  renderLocationBtn();
  onMarkLocation();

}

//helper function
function setAttributes(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}