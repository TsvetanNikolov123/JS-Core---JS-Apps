window.onload = () => {
    Sammy('BODY', function () {
        this.use('Handlebars', 'hbs');

        // Home
        // this.get('/', homeController.getHome);
        this.get('#/home', homeController.getHome);

        //User
        this.get('#/login', userController.getLogin);
        this.get('#/register', userController.getRegister);

        this.post('#/register', userController.postRegister);
        this.post('#/login', userController.postLogin);
        this.get('#/logout', userController.logout);

        //Offers
        this.get('#/offer/create', offerController.createGet);
        this.post('#/offer/create', offerController.createPost);
        this.get('#/offers/dashboard', offerController.loadOffers);
        this.get('#/offers/details/:id', offerController.loadDetails);
        this.get('#/offers/edit/:id', offerController.editGet);
        this.post('#/offers/edit/:id', offerController.editPost);
        this.get('#/offers/delete/:id', offerController.deleteGet);
        this.post('#/offers/delete/:id', offerController.deletePost);

    }).run('#/home');
};