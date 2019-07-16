function attachEvents() {
    document.querySelector('#btnLoadPosts')
        .addEventListener('click', loadPosts);
    document.querySelector('#btnViewPost')
        .addEventListener('click', viewPosts);

    const baseUrl = 'https://blog-apps-c12bf.firebaseio.com/';
    const postUrl = baseUrl + 'posts.json';
    const selects = document.querySelector('#posts');

    function handler(response) {
        if (response > 400) {
            throw new Error();
        }
        return response.json();
    }

    function loadPosts() {
        fetch(postUrl)
            .then(handler)
            .then(data => {
                selects.options.length = 0; //remove all elements in drop down menu
                const fragment = document.createDocumentFragment();
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        const element = data[key];
                        const option = document.createElement('option');
                        option.value = key;
                        option.innerHTML = element.title;
                        fragment.appendChild(option);
                    }
                }

                selects.appendChild(fragment);
            });
    }

    function viewPosts() {
        const postId = selects.value;
        const getPostUrl = baseUrl + `posts/${postId}.json`;
        fetch(getPostUrl)
            .then(handler)
            .then(data => {
                const postTitle = document.getElementById('post-title');
                postTitle.innerText = `${data.title}`;

                const postBody = document.getElementById('post-body');
                postBody.innerText = `${data.body}`;

                const searchedCommentsId = data.id;
                fetch(baseUrl + `comments.json`)
                    .then(handler)
                    .then(data => {
                        document.getElementById('post-comments').innerHTML = '';
                        for (const key in data) {
                            if (searchedCommentsId === data[key].postId) {
                                const liElement = document.createElement('li');
                                liElement.innerText = data[key].text;
                                document.getElementById('post-comments').appendChild(liElement);
                            }
                        }
                    });
            });
    }
}

attachEvents();