const APP_KEY = 'kid_BkxIMLyGB';
const USERNAME = 'guest';
const PASSWORD = 'guest';
const GET_BASE_64 = btoa(USERNAME + ':' + PASSWORD);
const BASE_URL = `https://baas.kinvey.com/appdata/${APP_KEY}/students`;
let currentId = 0;

function addPersonToDb() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const facultyNumber = document.getElementById('facultyNumber').value;
    const grade = document.getElementById('grade').value;

    if (firstName && lastName && facultyNumber && grade) {
        currentId++;
        const dataObject = {
            FirstName: firstName,
            LastName: lastName,
            FacultyNumber: facultyNumber,
            Grade: grade,
            ID: currentId
        };
        currentId = 0;
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
            .then(getStudents)
            .catch(err => console.log(err));
    }
}

function createInputFields() {
    const trElement = document.createElement('tr');

    const addButton = document.createElement("button");
    addButton.innerText = 'Add';
    addButton.addEventListener('click', addPersonToDb);
    const buttonTd = document.createElement('td');
    buttonTd.appendChild(addButton);
    trElement.appendChild(buttonTd);

    const firstNameField = document.createElement('input');
    firstNameField.id = 'firstName';
    firstNameField.placeholder = 'First Name ...';
    const firstNameTd = document.createElement('td');
    firstNameTd.appendChild(firstNameField);
    trElement.appendChild(firstNameTd);

    const lastNameField = document.createElement('input');
    lastNameField.id = 'lastName';
    lastNameField.placeholder = 'Last Name ...';
    const lastNameTd = document.createElement('td');
    lastNameTd.appendChild(lastNameField);
    trElement.appendChild(lastNameTd);

    const facultyNumberField = document.createElement('input');
    facultyNumberField.id = 'facultyNumber';
    facultyNumberField.placeholder = 'Faculty Number ...';
    const facultyNumberTd = document.createElement('td');
    facultyNumberTd.appendChild(facultyNumberField);
    trElement.appendChild(facultyNumberTd);

    const gradeField = document.createElement('input');
    gradeField.id = 'grade';
    gradeField.placeholder = 'Grade ...';
    const gradeTd = document.createElement('td');
    gradeTd.appendChild(gradeField);
    trElement.appendChild(gradeTd);

    document.querySelector('tbody').appendChild(trElement);
}

function getStudents() {
    document.querySelector('tbody').innerHTML = '';
    const headers = {
        'Authorization': 'Basic ' + GET_BASE_64
    };

    fetch(BASE_URL, {
        headers: headers
    })
        .then(handler)
        .then(data => {
            const sortedData = data.sort((a, b) => {
                return a.ID - b.ID
            });

            createNewRow(sortedData);
            createInputFields();
        })
        .catch(err => console.log(err))
}

getStudents();

function handler(response) {
    if (response.status >= 400) {
        throw new Error(response.status)
    }

    return response.json();
}

function createNewRow(sortedData) {
    for (const person of sortedData) {
        currentId++;
        const id = person.ID;
        const firstName = person.FirstName;
        const lastName = person.LastName;
        const facultyNumber = person.FacultyNumber;
        const grade = person.Grade;

        const trElement = document.createElement('tr');

        const tdId = document.createElement('td');
        tdId.textContent = id;

        const tdFirstName = document.createElement('td');
        tdFirstName.textContent = firstName;

        const tdLastName = document.createElement('td');
        tdLastName.textContent = lastName;

        const tdFacultyNumber = document.createElement('td');
        tdFacultyNumber.textContent = facultyNumber;

        const tdGradeNumber = document.createElement('td');
        tdGradeNumber.textContent = grade;

        trElement.appendChild(tdId);
        trElement.appendChild(tdFirstName);
        trElement.appendChild(tdLastName);
        trElement.appendChild(tdFacultyNumber);
        trElement.appendChild(tdGradeNumber);

        document.querySelector('tbody').appendChild(trElement);
    }
}
