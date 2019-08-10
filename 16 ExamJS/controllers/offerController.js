const offerController = function () {

    const createGet = function (context) {
        helper.addHeaderInfo(context);
        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs"
        }).then(function () {
            this.partial('../views/offers/create.hbs');
        });
    };

    const createPost = function (context) {
        const payload = {
            product: context.params.product,
            description: context.params.description,
            pictureUrl: context.params.pictureUrl,
            price: Number(context.params.price),
        };

        //  validation
        if (payload.product === "" ||
            payload.description === "" ||
            context.params.price === "" ||
            payload.pictureUrl === "") {
            return;
        }

        var re = (/\.(jpeg|jpg|gif|png)$/);
        if (!re.test(String(payload.pictureUrl).toLowerCase())) {
            return;
        }

        requester.post('offers', 'appdata', 'Kinvey', payload)
            .then(helper.handler)
            .then(() => {
                context.redirect('#/home');
            });
    };

    const loadOffers = function (context) {
        helper.addHeaderInfo(context);

        requester.get('offers', 'appdata', 'Kinvey')
            .then(helper.handler)
            .then((offers) => {
                context.offers = offers;

                context.loadPartials({
                    header: "../views/common/header.hbs",
                    footer: "../views/common/footer.hbs",
                }).then(function () {
                    this.partial('../views/offers/dashboard.hbs');
                });
            });
    };

    const loadDetails = function (context) {
        const offerId = context.params.id;

        helper.addHeaderInfo(context);

        requester.get(`offers/${offerId}`, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then((offerById) => {
                context.offer = offerById;

                helper.loadPartials(context)
                    .then(function () {
                        this.partial('../views/offers/details.hbs');
                    });
            });
    };

    const editGet = function (context) {
        const offerId = context.params.id; // get id from URL
        helper.addHeaderInfo(context);

        requester.get(`offers/${offerId}`, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then((singleOffer) => {
                context.offer = singleOffer;

                helper.loadPartials(context)
                    .then(function () {
                        this.partial('../views/offers/edit.hbs');
                    });
            });
    };

    const editPost = function (context) {
        const offerId = context.params.id; // get id from URL
        const payload = {
            product: context.params.product,
            description: context.params.description,
            pictureUrl: context.params.pictureUrl,
            price: Number(context.params.price),
        };

        //  validation
        if (payload.product === "" ||
            payload.description === "" ||
            context.params.price === "" ||
            payload.pictureUrl === "") {
            return;
        }

        var re = (/\.(jpeg|jpg|gif|png)$/);
        if (!re.test(String(payload.pictureUrl).toLowerCase())) {
            return;
        }


        requester.put(`offers/${offerId}`, 'appdata', 'Kinvey', payload)
            .then(helper.handler)
            .then(() => {
                context.redirect('#/offers/dashboard');
            });
    };

    const deleteGet = function (context) {
        const offerId = context.params.id; // get id from URL
        helper.addHeaderInfo(context);

        requester.get(`offers/${offerId}`, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then((singleOffer) => {
                context.offer = singleOffer;

                helper.loadPartials(context)
                    .then(function () {
                        this.partial('../views/offers/delete.hbs');
                    });
            });
    };

    const deletePost = function (context) {
        const offerId = context.params.id; // get id from URL

        requester.del(`offers/${offerId}`, 'appdata', 'Kinvey')
            .then(helper.handler)
            .then(() => {
                context.redirect('#/offers/dashboard');
            });
    };

    return {
        createGet,
        createPost,
        loadOffers,
        editGet,
        editPost,
        deleteGet,
        deletePost,
        loadDetails,
    };
}();
