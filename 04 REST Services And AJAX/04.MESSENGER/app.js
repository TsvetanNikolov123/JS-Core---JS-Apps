function attachEvents() {
    const URL = 'https://rest-messanger.firebaseio.com/messanger.json';
    const sendBtn = document.querySelector('#submit');
    const refreshBtn = document.querySelector('#refresh');

    sendBtn.addEventListener('click', () => sendMessage());
    refreshBtn.addEventListener('click', () => showMessage());

    function showMessage() {
        fetch(URL)
            .then(request => request.json())
            .then(data => {
                document.querySelector('#messages').value = '';

                const keys = Object.keys(data);
                for (const key of keys) {
                    const name = data[key].author;
                    const content = data[key].content;

                    document.querySelector('#messages').value += `${name}: ${content}\n`;
                }
            });
    }

    function sendMessage() {
        const author = document.querySelector('#author').value;
        const message = document.querySelector('#content').value;

        const obj = {
            author: author,
            content: message
        };
        fetch(URL, {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(obj)
        })
            .then(request => request.json());

        document.querySelector('#author').value = '';
        document.querySelector('#content').value = '';
    }
}

attachEvents();