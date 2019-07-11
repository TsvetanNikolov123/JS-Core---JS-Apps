function attachEvents() {
    document.querySelector('#btnLoad')
        .addEventListener('click', function () {
            const url = 'https://phonebook-nakov.firebaseio.com/phonebook.json';

            fetch(url)
                .then((request) => request.json())
                .then((data) => {
                    document.getElementById('phonebook').innerHTML = '';

                    const keys = Object.keys(data);

                    for (const key of keys) {
                        const name = data[key].person;
                        const phoneNumber = data[key].phone;

                        const dellBtn = document.createElement('button');
                        dellBtn.textContent = 'Delete';
                        dellBtn.addEventListener('click', function () {
                            const url = `https://phonebook-nakov.firebaseio.com/phonebook/${key}.json`;
                            fetch(url, {
                                method: 'delete'
                            })
                                .then(response => response.json());
                        });

                        const listItem = document.createElement('li');
                        listItem.textContent = `${name}: ${phoneNumber}`;
                        listItem.appendChild(dellBtn);

                        document.getElementById('phonebook').appendChild(listItem);
                    }
                });
        });

    document.querySelector('#btnCreate')
        .addEventListener('click', function () {
            const url = 'https://phonebook-nakov.firebaseio.com/phonebook.json';
            const person = document.querySelector('#person').value;
            const phone = document.querySelector('#phone').value;

            let obj = {person, phone};
            fetch(url, {
                method: 'post',
                headers: {'Content-type': 'application/json'},
                body: JSON.stringify(obj)
            });

            document.querySelector('#person').value = '';
            document.querySelector('#phone').value = '';
        });
}

attachEvents();