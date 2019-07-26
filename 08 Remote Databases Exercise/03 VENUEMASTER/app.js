const APP_KEY = 'kid_BJ_Ke8hZg';
const USERNAME = 'guest';
const PASSWORD = 'pass';
const GET_BASE_64 = btoa(USERNAME + ':' + PASSWORD);
const BASE_URL = `https://baas.kinvey.com/`;
const headers = {
    'Authorization': 'Basic ' + GET_BASE_64,
    'Content-Type': 'application/json'
};

const elements = {
    getVenueBtn: document.querySelector('#getVenues'),
    venueDateField: document.querySelector('#venueDate'),
    venueInfo: document.querySelector('#venue-info')
};

elements.getVenueBtn.addEventListener('click', getVenues);

function getVenues() {
    const getUrl = BASE_URL + `rpc/kid_BJ_Ke8hZg/custom/calendar?query=${elements.venueDateField.value}`;
    fetch(getUrl, {
        method: 'POST',
        headers: headers
    })
        .then(handler)
        .then(data => {
            for (const dataKey of data) {
                eachOfVenuesInfo(dataKey);
            }
        })
        .catch(err => console.log(err))
}

function eachOfVenuesInfo(dataKey) {
    const getUrl = BASE_URL + `appdata/kid_BJ_Ke8hZg/venues/${dataKey}`;
debugger;
    fetch(getUrl, {
        method: 'GET',
        headers: headers
    })
        .then(handler)
        .then(data => {
            const {_id, description, name, price, startingHour} = data;
            addToDOM(_id, description, name, price, startingHour);
        })
}

function addToDOM(_id, description, name, price, startingHour) {

}

function createHtmlElement(tagName, className, id, type, value, textContext) {
    const element = document.createElement(tagName);

    if (className) {
        element.classList.add(className);
    }

    if (type) {
        element.setAttribute(type.name, type.value);
    }

    if (value) {
        element.setAttribute(value.name, value.value);
    }

    if (textContext) {
        element.textContext = textContext;
    }

    if (id) {
        element.setAttribute(id.name, id.value);
    }

    return element;
}

function handler(response) {
    if (response.status >= 400) {
        throw new Error(response.status)
    }

    return response.json();
}