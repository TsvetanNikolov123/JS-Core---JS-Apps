// here we can change #rootElement to be 'body' and everything will be set to the body of our index.html
const app = Sammy("#rootElement", function () {

    this.use('Handlebars', 'hbs');

    // Home
    this.get('#/home', homeController.getHome);

    // User
    this.get('#/register', userController.getRegister);
    this.get('#/login', userController.getLogin);

    this.post('#/register', userController.postRegister);
    this.post('#/login', userController.postLogin);
    this.get('#/logout', userController.logout);

    // Events
    this.get('#/createEvent', eventController.getCreateEvent);
    this.post('#/createEvent', eventController.postCreateEvent);
    this.get('#/eventDetails/:eventId', eventController.getDetailsEvent);
    /*  when we have anchor tag we must use get request #/eventDetails/:eventId -> in sammy
        everything that comes after slash and semicolon will be written in the context with property
        witch will be everything after /:  In our case /:eventId  will be property id and value the string witch he gets from
        <a href="#/eventDetails/{{_id}}" class="eventDetails">More</a> */
});

(() => {
    app.run('#/home');
})();