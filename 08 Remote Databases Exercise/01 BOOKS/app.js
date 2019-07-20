/* tnx to Yotko Kanchev */

const APP_ID = 'kid_BkxIMLyGB';
const APP_SECRET = '98e4b6af434c4b72a667872af2076c0f';
const USERNAME = 'guest';
const PASSWORD = 'guest';
const GET_BASE_64 = btoa(USERNAME + ':' + PASSWORD);
const POST_BASE_64 = btoa(APP_ID + ":" + APP_SECRET);
const GET_AUTH = {"Authorization": 'Basic ' + GET_BASE_64};


function CRUD() {
    const tableBody = document.querySelector('tbody');
    tableBody.innerHTML = '';
    const loadBtn = document.getElementById('loadBooks');
    loadBtn.addEventListener('click', getAllBooks);

    function getAllBooks() {
        const url = `https://baas.kinvey.com/appdata/${APP_ID}/books`;

        fetch(url, {
            headers: GET_AUTH
        })
            .then(handler)
            .then((data) => {
                const values = Object.values(data);
                for (const value of values) {
                    const [id, isbn, author, title] = Object.values(value);
                    const trElement = document.createElement('tr');
                    trElement.innerHTML = `
                                        <td>${title}</td>
                                        <td>${author}</td>
                                        <td>${isbn}</td>
                                        <td>
                                            <button>Edit</button>
                                            <button>Delete</button>
                                        </td>`;
                    trElement.setAttribute('id', id);
                    tableBody.appendChild(trElement);
                }
            });

    }

    function createHtmlElement(tagName, className, textContent,) {
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
        if (response.statusText > 400) {
            throw new Error(`Something went wrong. Error: ${response.statusText}`);
        }

        return response.json();
    }
}

CRUD();