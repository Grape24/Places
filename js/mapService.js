'use strict';

var gPlaces;
var PLACES_KEY = 'places'
var gNextId = 101;


createPlaces();

function createPlaces(){
    var places = loadPlacesFromStorage();
        if (!places || places.length === 0){
            places = [createPlace('Home', 'A place to hang out with Toshi and Gal', {lat: 32.09369143162069, lng: 34.78256276635841}),
                        createPlace('Studies', 'The place where I learned to make this list', {lat: 32.088039978521664, lng: 34.80312645435333})]
        }
    gPlaces = places;
    gNextId = gPlaces.length+101;
    savePlacesToStorage();

}

function createPlace(placeTitle, placeDesc, placeCoords){
    return {
        id: gNextId++, 
        placeTitle,
        placeDesc,
        placeCoords
    }
}

function addPlace(placeTitle, placeDesc, placeCoords){
    let place = createPlace(placeTitle, placeDesc, placeCoords);
    gPlaces.push(place);
    savePlacesToStorage();
}

function removePlaceById(idx){
    idx = +idx;
    let places = gPlaces.filter(function(place){
        return !(place.id === idx);
    })
    gPlaces = places;
    savePlacesToStorage();
}

function updatePlaceById(title, desc, idx){
    let place = gPlaces.filter(function(place){
        return place.id === idx;
    })
    place[0].placeTitle = title;
    place[0].placeDesc = desc;
    savePlacesToStorage();  
}
function findCoordsById(idx){
    let place = gPlaces.filter(function(place){
        return place.id === idx;
    })
    return place[0].placeCoords;
}

function findPlaceNameById(idx){
    let place = gPlaces.filter(function(place){
        return place.id === idx;
    })
    return place[0].placeTitle;
}

function savePlacesToStorage(){
    saveToStorage(PLACES_KEY, gPlaces);
}

function loadPlacesFromStorage(){
    return loadFromStorage(PLACES_KEY);
}