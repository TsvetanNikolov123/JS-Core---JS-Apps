const APP_KEY = 'kid_BkxIMLyGB';
const APP_SECRET = '98e4b6af434c4b72a667872af2076c0f';
const USERNAME = 'guest';
const PASSWORD = 'guest';
const GET_BASE_64 = btoa(USERNAME + ':' + PASSWORD);
// const POST_BASE_64 = btoa(APP_KEY + ':' + APP_SECRET);
const BASE_URL = `https://baas.kinvey.com/appdata/${APP_KEY}/books`;

const elements = {
    btnSubmit: document.querySelector('form button'),
    btnLoadBooks: document.querySelector('#loadBooks'),
    btnCancelEdit: document.querySelector('#cancelBtn'),
    btnDoneEdit: document.querySelector('#editBtn'),
    inputTitle: document.querySelector('#title'),
    inputAuthor: document.querySelector('#author'),
    inputIsbn: document.querySelector('#isbn'),
    tbodyBooks: document.querySelector('tbody'),
    h3Form: document.querySelector('form h3')
};

elements.tbodyBooks.innerHTML = '';

elements.btnSubmit.addEventListener('click', addBook);
elements.btnLoadBooks.addEventListener('click', loadBooks);
elements.btnDoneEdit.addEventListener('click', editBook);
elements.btnCancelEdit.addEventListener('click', cancelEdit);

function addBook(ev) {
    ev.preventDefault();

    const title = elements.inputTitle.value;
    const author = elements.inputAuthor.value;
    const isbn = elements.inputIsbn.value;

    if (title && author && isbn) {
        const dataObject = {
            title,
            author,
            isbn
        };

        const headers = {
            method: 'POST',
            body: JSON.stringify(dataObject),
            credentials: 'include',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Basic ' + GET_BASE_64
            }
        };

        fetch(BASE_URL, headers)
            .then(handler)
            .then(loadBooks)
            .catch(err => console.log(err));
    }
}

function loadBooks() {
    const headers = {
        'Authorization': 'Basic ' + GET_BASE_64
    };

    fetch(BASE_URL, {
        headers: headers
    })
        .then(handler)
        .then((data) => {
            elements.tbodyBooks.innerHTML = '';

            data.forEach(book => {
                const trNextBook = document.createElement('tr');
                trNextBook.setAttribute('id', book._id);

                trNextBook.innerHTML = `
                                        <td>${book.title}</td>
                                        <td>${book.author}</td>
                                        <td>${book.isbn}</td>
                                        <td>
                                            <button class="btnEdit" value="${book._id}">Edit</button>
                                            <button class="btnDelete" value="${book._id}">Delete</button>
                                        </td>`;

                trNextBook
                    .querySelector('button.btnEdit')
                    .addEventListener('click', () => loadEditForm(book._id));

                trNextBook
                    .querySelector('button.btnDelete')
                    .addEventListener('click', () => deleteBook(book._id));

                elements.tbodyBooks.appendChild(trNextBook);
                clearElementsValue(elements.inputTitle, elements.inputAuthor, elements.inputIsbn);
            });

        })
        .catch(err => console.log(err));

    fromEditToSubmitForm();
}

function fromEditToSubmitForm() {
    clearElementsValue(elements.inputTitle, elements.inputAuthor, elements.inputIsbn);
    elements.h3Form.textContent = 'FORM';
    elements.btnSubmit.style.display = 'block';
    elements.btnDoneEdit.style.display = 'none';
    elements.btnCancelEdit.style.display = 'none';

}

function clearElementsValue(...arguments) {
    arguments.forEach(element =>{
        element.value = '';
    })
}

function cancelEdit(ev) {
    ev.preventDefault();
    fromEditToSubmitForm();
}

function editBook(ev) {
    ev.preventDefault();

    const bookId = ev.target.value;
    ev.target.value = '';

    const bookData = {
        'title': elements.inputTitle.value,
        'author': elements.inputAuthor.value,
        'isbn': elements.inputIsbn.value,
    };

    const editUrl = `${BASE_URL}/${bookId}`;
    const headers = {
        method: 'PUT',
        body: JSON.stringify(bookData),
        credentials: 'include',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Basic ' + GET_BASE_64
        }
    };

    fetch(editUrl, headers)
        .then(handler)
        .then(loadBooks)
        .catch(err => console.log(err))
}

function deleteBook(bookId) {
    const deleteUrl = `${BASE_URL}/${bookId}`;

    const headers = {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Basic ' + GET_BASE_64
        }
    };

    fetch(deleteUrl, headers)
        .then(handler)
        .then(loadBooks)
        .then(err => console.log(err));
}

function loadEditForm(bookId) {
    const dataToEdit = document
        .getElementById(bookId)
        .querySelectorAll('td');

    elements.inputTitle.value = dataToEdit[0].textContent;
    elements.inputAuthor.value = dataToEdit[1].textContent;
    elements.inputIsbn.value = dataToEdit[2].textContent;

    elements.h3Form.textContent = 'Edit Book';

    elements.btnSubmit.style.display = 'none';
    elements.btnDoneEdit.style.display = 'block';
    elements.btnCancelEdit.style.display = 'block';

    elements.btnDoneEdit.value = bookId;
}

function handler(response) {
    if (response.status >= 400) {
        throw new Error(response.status)
    }

    return response.json();
}