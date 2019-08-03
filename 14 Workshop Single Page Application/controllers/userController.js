const userController = function () {

    const getRegister = function (context) {

        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs"
        }).then(function () {
            this.partial('../views/user/registerPage.hbs')
        })
    };

    const getLogin = function (context) {
        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs"
        }).then(function () {
            this.partial('../views/user/loginPage.hbs')
        })
    };

    const postRegister = function (context) {
        helper.notify('loading');
        userModel.register(context.params)
            .then(helper.handler)
            .then((data) => {
                helper.stopNotify();
                helper.notify('success', 'You was registered successfully!'); // this one is too for notification
                storage.saveUser(data);
                homeController.getHome(context);
            })
    };

    const postLogin = function (context) {
        helper.notify('loading'); // that peace of code is for notifications
        userModel.login(context.params)
            .then(helper.handler)
            .then((data) => {
                helper.stopNotify();
                helper.notify('success', 'You just logged-in!'); // this one is too for notification
                storage.saveUser(data);
                homeController.getHome(context);
            })
    };

    const logout = function (context) {

        userModel.logout()
            .then(helper.handler)
            .then(() => {
                storage.deleteUser();
                homeController.getHome(context);
            });
    };

    return {
        getRegister,
        postRegister,
        getLogin,
        postLogin,
        logout
    }
}();