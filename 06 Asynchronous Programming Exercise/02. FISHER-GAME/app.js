function attachEvents() {
    const elements = {
        loadBtn: document.querySelector('button.load'),
        createBtn: document.querySelector('button.add'),
        catches: document.getElementById('catches'),
    };

    elements.loadBtn.addEventListener('click', loadAllCatches);
    elements.createBtn.addEventListener('click', createCatch);

    function loadAllCatches() {
        fetch('https://fisher-game.firebaseio.com/catches.json', {method: 'GET'})
            .then(handler)
            .then(showAllCatches);
    }

    function showAllCatches(data) {
        Object.keys(data).forEach((key) => {
            const placeholderElement = elements.catches.children[0];
            const catchElement = placeholderElement.cloneNode(true);
            // placeholderElement.style.display = 'none';

            catchElement.setAttribute('data-id', key);
            catchElement.querySelector('input.angler').value = data[key].angler;
            catchElement.querySelector('input.weight').value = data[key].weight;
            catchElement.querySelector('input.species').value = data[key].species;
            catchElement.querySelector('input.location').value = data[key].location;
            catchElement.querySelector('input.bait').value = data[key].bait;
            catchElement.querySelector('input.captureTime').value = data[key].captureTime;

            catchElement.querySelector('button.update').addEventListener('click', updateCatch);
            catchElement.querySelector('button.delete').addEventListener('click', deleteCatch);

            elements.catches.appendChild(catchElement);
        });

        function deleteCatch(event) {
            // console.log(event.currentTarget);
            const catchId = event.currentTarget.parentNode.getAttribute('data-id');
            const catchElement = event.currentTarget.parentNode;

            const headers = {
                method: 'DELETE',
            };
            fetch(`https://fisher-game.firebaseio.com/catches/${catchId}.json`, headers)
                .then(handler)
                .then((data) => {
                    catchElement.remove();
                });
        }

        function updateCatch(event) {
            // console.log(this.parentNode);
            const catchId = event.currentTarget.parentNode.getAttribute('data-id');
            const catchElement = event.currentTarget.parentNode;

            const data = Array.from(catchElement.children)
                .filter((element) => element.tagName === 'INPUT')
                .reduce((acc, curr) => {
                    const prop = curr.className;
                    acc[prop] = curr.value;
                    return acc;
                }, {});

            const headers = {
                method: 'PUT',
                body: JSON.stringify(data)
            };

            fetch(`https://fisher-game.firebaseio.com/catches/${catchId}.json`, headers)
                .then(handler)
                .then((data) => {
                    // console.log(data);

                    /* simulate click event on load button to auto reload page */
                    elements.loadBtn.click();
                    // elements.loadBtn.trigger('click');
                });
        }
    }

    function createCatch() {
        const catchElement = document.querySelector('fieldset#addForm');
        const data = Array.from(catchElement.children)
            .filter((element) => element.tagName === 'INPUT')
            .reduce((acc, curr) => {
                const prop = curr.className;
                acc[prop] = curr.value;
                return acc;
            }, {});

        const headers = {
            method: 'POST',
            body: JSON.stringify(data)
        };

        fetch(`https://fisher-game.firebaseio.com/catches.json`, headers)
            .then(handler)
            .then((data) => {
                elements.loadBtn.click();
            });
    }

    function handler(response) {
        if (response.statusText > 400) {
            throw new Error(`Something went wrong. Error: ${response.statusText}`);
        }

        return response.json();
    }
}

attachEvents();
