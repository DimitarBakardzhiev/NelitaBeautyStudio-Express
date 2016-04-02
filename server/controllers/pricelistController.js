module.exports = function (app, pricelistServices) {
    app.get('/pricelist/all', function (req, res, next) {
        pricelistServices.all(function (err, pricelists) {
            if (err) return next(err);
            res.render('./pricelist/all', { pricelists: pricelists });
        });
    });

    app.get('/pricelist/create', app.locals.isLoggedIn, app.locals.isAdmin, function (req, res) {
        res.render('./pricelist/create');
    });

    app.post('/pricelist/create', app.locals.isLoggedIn, app.locals.isAdmin, function (req, res, next) {
        var newPL = {
            title: req.body.title
        };

        pricelistServices.create(newPL, function (err, newPriceList) {
            if (err) return next(err);
            res.redirect('/pricelist/all');
        });
    });

    app.get('/pricelist/edit/:id', app.locals.isLoggedIn, app.locals.isAdmin, function (req, res, next) {
        var id = req.params.id;
        pricelistServices.byId(id, function (err, pricelist) {
            if (err) return next(err);
            res.render('./pricelist/edit', { pricelist: pricelist });
        });
    });

    app.post('/pricelist/edit/:id', app.locals.isLoggedIn, app.locals.isAdmin, function (req, res, next) {
        var id = req.params.id;
        var newTitle = req.body.title;

        pricelistServices.editTitle(id, newTitle, function (err) {
            if (err) return next(err);

            res.redirect('/pricelist/all');
        });
    });

    app.get('/pricelist/delete/:id', app.locals.isLoggedIn, app.locals.isAdmin, function (req, res, next) {
        var id = req.params.id;

        pricelistServices.remove(id, function (err) {
            if (err) return next(err);

            res.redirect('/pricelist/all');
        });
    });

    app.get('/pricelist/:id/addService', app.locals.isLoggedIn, app.locals.isAdmin, function (req, res) {
        res.render('./pricelist/addService');
    });

    app.post('/pricelist/:id/addService', app.locals.isLoggedIn, app.locals.isAdmin, function (req, res, next) {
        var id = req.params.id;
        var service = {
            service: req.body.service,
            price: req.body.price
        };

        pricelistServices.addService(id, service, function (err) {
            if (err) return next(err);

            res.redirect('/pricelist/all');
        });
    });

    app.get('/pricelist/editService/:pricelistId/:id', app.locals.isLoggedIn, app.locals.isAdmin, function (req, res, next) {
        var id = req.params.id;
        var pricelistId = req.params.pricelistId;

        pricelistServices.findService(id, pricelistId, function (err, service) {
            if (err) return next(err);

            res.render('./pricelist/editService', { service: service });
        });
    });

    app.post('/pricelist/editService/:pricelistId/:id', app.locals.isLoggedIn, app.locals.isAdmin, function (req, res, next) {
        var id = req.params.id;
        var pricelistId = req.params.pricelistId;
        var service = {
            service: req.body.service,
            price: req.body.price
        };

        pricelistServices.editService(id, pricelistId, service, function (err) {
            if (err) return next(err);

            res.redirect('/pricelist/all');
        });
    });
    
    app.get('/pricelist/removeService/:pricelistId/:id', app.locals.isLoggedIn, app.locals.isAdmin, function (req, res, next) {
        var id = req.params.id;
        var pricelistId = req.params.pricelistId;
        
        pricelistServices.removeService(id, pricelistId, function (err) {
            if (err) return next(err);

            res.redirect('/pricelist/all');
        });
    });
};