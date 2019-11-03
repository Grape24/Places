'use strict'


function showAge(age){
    document.querySelector('#sAge').innerText = age;
}

function onChosenColor(elColorInput){
    let styleValue = elColorInput.value;
    let styleProperty = elColorInput.name
    let colors = loadPreferncesFromStorage();
    if(colors === null){
        colors = gUserPrefernces;
    }
    if (styleProperty === 'background-color'){ 
        var backgroundColor = styleValue;
        var color = colors.textColor;
    }
    else {
        color = styleValue;
        backgroundColor = colors.backgroundColor;
    }
    updatePreferences(backgroundColor, color);
}

function renderHomePageColors(){
    let colors = loadPreferncesFromStorage();
    if(colors == null){
        colors = gUserPrefernces;
    } 
    let backgroundColor = colors.backgroundColor;
    let elBody = document.querySelector('body');
    elBody.style.backgroundColor = backgroundColor;
    let textColor =  colors.textColor;
    elBody.style.color = textColor;
}


function renderUserPref(){
    let colors = loadPreferncesFromStorage();
    if(colors == null){
        colors = gUserPrefernces;
    }
    let backgroundColor = colors.backgroundColor;
    let textColor =  colors.textColor;
    let elBackgroundInput = document.querySelector('[name="background-color"]');
    elBackgroundInput.setAttribute('value', backgroundColor);
    let elTextColorInput = document.querySelector('[name="text-color"]');
    elTextColorInput.setAttribute('value', textColor);
}

function openModal(){
    var elModal = document.getElementById("myModal");
    elModal.style.display = "block";
    var elSpan = document.getElementsByClassName("close")[0];
    elSpan.onclick = function() {
    elModal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == elModal) {
            elModal.style.display = "none";
        }
    }
    renderCookieContent();
}

function renderCookieContent(){
    let cookieFortunes = [`It's meow or never...`, 'From now on your kindness will lead you to success.', 'If you continually give, you will continually have.']
    let idx = getRandomIntInclusive(0, 2);
    let cookieFortune = cookieFortunes[idx];
    let elDiv = document.querySelector('.fortune-content');
    elDiv.innerText = cookieFortune;
}

function onSubmitForm(event){
    event.preventDefault();
    let elFormInputs = document.querySelectorAll('input');
    let elValueInputs = [];
    for(let i = 0; i < elFormInputs.length; i++){
       let elValueInput =  elFormInputs[i].value;
       elValueInputs.push(elValueInput);
    }
    gUserData = createUserData(elValueInputs[0],elValueInputs[1],elValueInputs[2],elValueInputs[3],elValueInputs[4]);
    saveUserDataToStorage();
}

