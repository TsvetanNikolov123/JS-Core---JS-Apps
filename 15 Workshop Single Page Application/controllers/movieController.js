const movieController = function () {

    const createGet = function (context) {
        helper.addHeaderInfo(context);
        context.loadPartials({
            header: "./views/common/header.hbs",
            footer: "./views/common/footer.hbs"
        }).then(function () {
            this.partial('./views/movies/create.hbs')
        })
    };

    const createPost = function (context) {
        const payload = {
            title: context.params.title,
            imageURL: context.params.imageUrl,
            description: context.params.description,
            tickets: Number(context.params.tickets),
            genres: context.params.genres
        };

        //  validation
        // if (payload.title.length < 6) {
        //return with some error???
        // return;
        // }

        requester.post('movies', 'appdata', 'Kinvey', payload)
            .then(helper.handler)
            .then(() => {
                context.redirect('#/home');
            });
    };

    const loadCinema = function (context) {
        helper.addHeaderInfo(context);

        const endpoint = `movies?query={}&sort={"tickets": -1}`;
        requester.get(endpoint, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then((movies) => {
                context.movies = movies;

                context.loadPartials({
                    header: "./views/common/header.hbs",
                    footer: "./views/common/footer.hbs",
                    'single-movie': './views/movies/single-movie.hbs'
                }).then(function () {
                    this.partial('./views/movies/cinema.hbs')
                })
            });
    };

    const myMovies = function (context) {
        helper.addHeaderInfo(context);
        const endpoint = `movies?query={"_acl.creator":"${sessionStorage.getItem('userId')}"}`;
        requester.get(endpoint, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then((myMovies) => {
                context.movies = myMovies;

                context.loadPartials({
                    header: "./views/common/header.hbs",
                    footer: "./views/common/footer.hbs",
                }).then(function () {
                    this.partial('./views/movies/my-movies.hbs')
                });
            });
    };

    const editGet = function (context) {
        const movieId = context.params.id; // get id from URL
        helper.addHeaderInfo(context);

        requester.get(`movies/${movieId}`, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then((singleMovie) => {
                context.movie = singleMovie;

                helper.loadPartials(context)
                    .then(function () {
                        this.partial('../views/movies/edit.hbs');
                    })
            });
    };

    const editPost = function (context) {
        const movieId = context.params.id; // get id from URL
        console.log(movieId);
        const payload = {
            title: context.params.title,
            imageURL: context.params.imageUrl,
            description: context.params.description,
            tickets: Number(context.params.tickets),
            genres: context.params.genres
        };

        requester.put(`movies/${movieId}`, 'appdata', 'Kinvey', payload)
            .then(helper.handler)
            .then(() => {
                context.redirect('#/movie/user');
            });
    };

    const deleteGet = function (context) {
        const movieId = context.params.id; // get id from URL
        helper.addHeaderInfo(context);

        requester.get(`movies/${movieId}`, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then((singleMovie) => {
                context.movie = singleMovie;

                helper.loadPartials(context)
                    .then(function () {
                        this.partial('../views/movies/delete.hbs');
                    })
            });
    };

    const deletePost = function (context) {
        const movieId = context.params.id; // get id from URL

        requester.del(`movies/${movieId}`, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then(() => {
                context.redirect('#/home');
            })
    };

    return {
        createGet,
        createPost,
        loadCinema,
        myMovies,
        editGet,
        editPost,
        deleteGet,
        deletePost
    }
}();

// DO NOT FORGET TO LINK IT IN Index.html file !!!
// and add it to app.js