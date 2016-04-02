module.exports = function (app, contactsServices) {
    app.get('/contacts', function (req, res, next) {
        contactsServices.all(function (err, contacts) {
            if (err) return next(err);

            res.render('./contacts/index', { contacts: contacts });
        });
    });

    app.get('/contacts/create', app.locals.isLoggedIn, app.locals.isAdmin, function (req, res) {
        res.render('./contacts/create');
    });

    app.post('/contacts/create', app.locals.isLoggedIn, app.locals.isAdmin, function (req, res, next) {
        var contact = {
            type: req.body.type,
            content: req.body.content
        };

        contactsServices.create(contact, function (err) {
            if (err) return next(err);

            res.redirect('/contacts');
        });
    });

    app.get('/contacts/edit/:id', app.locals.isLoggedIn, app.locals.isAdmin, function (req, res, next) {
        contactsServices.byId(req.params.id, function (err, contact) {
            if (err) return next(err);

            res.render('./contacts/edit', { contact: contact });
        });
    });

    app.post('/contacts/edit/:id', app.locals.isLoggedIn, app.locals.isAdmin, function (req, res, next) {
        var contact = {
            type: req.body.type,
            content: req.body.content
        };

        contactsServices.update(req.params.id, contact, function (err) {
            if (err) return next(err);

            res.redirect('/contacts');
        });
    });

    app.get('/contacts/delete/:id', app.locals.isLoggedIn, app.locals.isAdmin, function (req, res, next) {
        contactsServices.remove(req.params.id, function (err) {
            if (err) return next(err);

            res.redirect('/contacts');
        });
    });
};