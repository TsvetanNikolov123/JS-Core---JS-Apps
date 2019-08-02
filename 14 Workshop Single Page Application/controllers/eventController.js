const eventController = function () {

    /**
     * context is coming from sammy
     * @param context
     *
     * -> useful when we enter values to input fields in our web page
     *  console.log(context)
     *  console.log(context.params)
     *
     * first think we do in our getCreateEvent is to check are we logged in or not and
     * the show the correct nav-bar for logged in or anonymous users
     *
     *
     * dont forget to link this eventController.js file to out html file !!!
     */
    const getCreateEvent = function (context) {
        const loggedIn = storage.getData('userInfo') !== null;
        if (loggedIn) {
            const username = JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn = loggedIn;
            context.username = username;
        }

        context.loadPartials({
            header: '../views/common/header.hbs',
            footer: '../views/common/footer.hbs'
        }).then(function () {
            this.partial('../views/events/createEvent.hbs')
        });
    };

    const postCreateEvent = function (context) {
        eventModel.createEvent(context.params); // context.params get info from fields in our html file
    };

    return {
        getCreateEvent,
        postCreateEvent,
    }
}();