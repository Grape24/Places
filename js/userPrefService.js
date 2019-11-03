'use strict'

var gUserPrefernces = createPreferences('#FFFFFF', '#000000');
var gUserData;
const PREFERENCES_KEY = 'userPrefernces';
const USERDATA_KEY = 'userData';

function createUserData(email, age, backgroundColor, textColor, dateAndHourOfBirth){
    return{
        email,
        age,
        backgroundColor,
        textColor,
        dateAndHourOfBirth,
    }
}


function createPreferences(backgroundColor, textColor){
    return {
        backgroundColor,
        textColor,
        }
}

function updatePreferences(background, color){
    gUserPrefernces.backgroundColor = background;
    gUserPrefernces.textColor = color;
    savePreferncesToStorage();

}

function saveUserDataToStorage(){
    saveToStorage(USERDATA_KEY, gUserData)
}



function savePreferncesToStorage(){
    saveToStorage(PREFERENCES_KEY, gUserPrefernces)
}

function loadPreferncesFromStorage() {
    return loadFromStorage(PREFERENCES_KEY);
}

