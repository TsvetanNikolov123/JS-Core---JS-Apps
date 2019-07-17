function attachEvents() {
    const urlBase = 'https://judgetests.firebaseio.com/locations.json';

    const elements = {
        inputField: document.getElementById('location'),
        button: document.getElementById('submit'),
        current: document.getElementById('current'),
        upcoming: document.getElementById('upcoming'),
        forecast: document.getElementById('forecast'),
    };

    const symbols = {
        sunny: '☀',
        partlySunny: '⛅',
        overcast: '☁',
        rain: '☂',
        degrees: '°'
    };

    elements.button.addEventListener('click', loadWeatherInfo);

    function loadWeatherInfo() {
        elements.forecast.style.display = 'block';
        fetch(urlBase)
            .then(handler)
            .then(loadLocationWeatherInfo);
    }

    function showError() {
        const divElement = createHtmlElement('div');
        const h1 = createHtmlElement('h1');
        h1.innerHTML = 'Error';
        divElement.appendChild(h1);
        elements.current.appendChild(divElement);
    }

    function loadLocationWeatherInfo(data) {
        try {
            const location = data.filter((obj) => obj.name === elements.inputField.value)[0];
            const urlToday = `https://judgetests.firebaseio.com/forecast/today/${location.code}.json`;
            fetch(urlToday)
                .then(handler)
                .then((data) => showLocationWeatherInfo(data, location.code));
        } catch (e) {
            showError();
        }
    }

    function showLocationWeatherInfo(data, code) {
        let divForecast = createHtmlElement('div', 'forecasts');
        const symbol = symbols[data.forecast.condition.toLowerCase()];
        const spanSymbol = createHtmlElement('span', ['condition', 'symbol'], symbol);

        let spanHolder = createHtmlElement('span', 'condition');

        const spanName = createHtmlElement('span', 'forecast-data', data.name);
        const degrees = `${data.forecast.low}${symbols.degrees}/${data.forecast.high}${symbols.degrees}`;
        const spanDegrees = createHtmlElement('span', 'forecast-data', degrees);
        const spanCondition = createHtmlElement('span', 'forecast-data', data.forecast.condition);

        spanHolder = appendChildrenToParen([spanName, spanDegrees, spanCondition], spanHolder);
        divForecast = appendChildrenToParen([spanSymbol, spanHolder], divForecast);

        elements.current.appendChild(divForecast);

        loadUpcomingLocationWeatherInfo(code);
    }

    function loadUpcomingLocationWeatherInfo(code) {
        fetch(`https://judgetests.firebaseio.com/forecast/upcoming/${code}.json`)
            .then(handler)
            .then(showUpcomingLocationWeatherInfo);
    }

    function showUpcomingLocationWeatherInfo(data) {
        const divForecast = createHtmlElement('div', 'forecast-info');

        data.forecast.forEach((obj) => {
            const spanHolder = createHtmlElement('span', 'upcoming');

            const symbol = symbols[obj.condition.toLowerCase()] || symbols['partlySunny'];
            const degrees = `${obj.low}${symbols.degrees}/${obj.high}${symbols.degrees}`;

            const spanSymbol = createHtmlElement('span', 'symbol', symbol);
            const spanDegrees = createHtmlElement('span', 'forecast-data', degrees);
            const spanCondition = createHtmlElement('span', 'forecast-data', obj.condition);

            divForecast.appendChild(appendChildrenToParen([spanSymbol, spanDegrees, spanCondition], spanHolder));
        });

        elements.upcoming.appendChild(divForecast);
    }

    function appendChildrenToParen(children, parent) {
        children.forEach((child) => parent.appendChild(child));

        return parent;
    }

    function createHtmlElement(tagName, className, textContent) {
        const currentElement = document.createElement(tagName);

        if (typeof className === 'string') {
            currentElement.classList.add(className);
        } else if (typeof className === 'object') {
            currentElement.classList.add(...className);
        }

        if (textContent) {
            currentElement.textContent = textContent;
        }

        return currentElement;
    }

    function handler(response) {
        if (response.status > 400) {
            showError()
            throw new Error(`Something went wrong. Error: ${response.statusText}`);
        }

        return response.json();
    }
}

attachEvents();