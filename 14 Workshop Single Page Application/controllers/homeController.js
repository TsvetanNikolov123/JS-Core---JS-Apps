const homeController = function () {

    const getHome = async function (context) {
        const loggedIn = storage.getData('userInfo') !== null;

        if (loggedIn) {
            const username = JSON.parse(storage.getData('userInfo')).username;
            context.loggedIn = loggedIn;
            context.username = username;

            try {
                const response = await eventModel.getAllEvents();
                context.events = await response.json();
            } catch (e) {
                console.log(e);
            }
        }

        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs",
            eventView: "../views/events/eventView.hbs",
            noEvents: "../views/events/noEvents.hbs"
        }).then(function () {
            this.partial('../views/home/homePage.hbs')
        })
    };

    return {
        getHome
    }
}();