function loadCommits() {
    document.querySelector('#commits').innerHTML = '';

    const userName = document.querySelector('#username').value;
    const repository = document.querySelector('#repo').value;
    const url = `https://api.github.com/repos/${userName}/${repository}/commits`;

    fetch(url)
        .then((response) => {
            if (response.status >= 300) {
                throw new Error(`${response.status} (${response.statusText})`);
            }

            return response.json();
        })
        .then((data) => {
            data.forEach(commitObj => {
                const authorName = commitObj.commit.author.name;
                const commitMessage = commitObj.commit.message;

                const liElement = `<li>${authorName}: ${commitMessage}</li>`;
                document.querySelector('#commits').innerHTML += liElement;
            });
        })
        .catch((error) => {
            document.querySelector('#commits').innerHTML = '<li>' + error.toString() + '</li>';
        });
}