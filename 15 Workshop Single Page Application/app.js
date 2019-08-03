window.onload = () => {
    Sammy('#container', function () {
        this.use('Handlebars', hbs);

        // Home
        this.get('/', homeController.getHome);
        this.get('#/home', homeController.getHome);

        //User
        this.get('#/login', userController.getLogin);
        this.get('#/register', userController.getRegister);

        this.post('#/register', userController.postRegister);
        this.post('#/login', userController.postLogin);
        this.get('#/logout', userController.logout);
    }).run();
};