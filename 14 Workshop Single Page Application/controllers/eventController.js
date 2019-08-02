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
        eventModel.createEvent(context.params) // context.params get info from fields in our html file
            .then(helper.handler)
            .then(() => {
                // notify user for success
                homeController.getHome(context);
            });
    };

    const getDetailsEvent = async function (context) {
        const loggedIn = storage.getData('userInfo') !== null;
        if (loggedIn) {
            const username = JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn = loggedIn;
            context.username = username;

            const response = await eventModel.getEvent(context.params.eventId);
            const event = await response.json();

            Object.keys(event).forEach((key) => {
                context[key] = event[key];
            });
        }

        context.loadPartials({
            header: '../views/common/header.hbs',
            footer: '../views/common/footer.hbs'
        }).then(function () {
            this.partial('../views/events/detailsEvent.hbs');
        })
    };

    return {
        getCreateEvent,
        postCreateEvent,
        getDetailsEvent,
    }
}();