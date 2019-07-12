function attachEvents() {
    let loadButton = document.getElementById("btnLoad");
    let phoneBook = document.getElementById("phonebook");

    loadButton.addEventListener("click", function () {
        reloadData();
    });

    let createButton = document.getElementById("btnCreate");
    let personInput = document.getElementById("person");
    let phoneInput = document.getElementById("phone");

    createButton.addEventListener("click", function () {
        let person = personInput.value;
        let phone = phoneInput.value;

        let data = {
            person,
            phone
        };

        fetch("https://phonebook-nakov.firebaseio.com/phonebook.json", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(x => x.json())
            .then(x => {
                reloadData();
            });
    });

    function reloadData() {
        phoneBook.innerHTML = "";
        fetch("https://phonebook-nakov.firebaseio.com/phonebook.json")
            .then(x => x.json())
            .then(x => {
                if (x) {
                    for (const key of Object.keys(x)) {
                        let person = x[key];
                        let name = person.person;
                        let phone = person.phone;
                        let li = document.createElement("li");
                        li.textContent = `${name}: ${phone}`;
                        let button = document.createElement("button");
                        button.textContent = "Delete";
                        button.className = "button";
                        button.addEventListener("click", () => deleteFunction(key))
                        li.appendChild(button);
                        phoneBook.appendChild(li);
                    }
                }
            });
    }

    function deleteFunction(key) {
        fetch(`https://phonebook-nakov.firebaseio.com/phonebook/${key}.json`, {
            method: 'DELETE',
        })
            .then(x => x.json())
            .then(x => {
                reloadData();
            });
    }
}

attachEvents();