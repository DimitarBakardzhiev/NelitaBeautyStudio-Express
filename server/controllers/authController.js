var User = require('../models/user');

module.exports = function (app, passport) {
    app.get('/auth/login', function(req, res) {

        res.render('./auth/login', { message: req.flash('loginMessage') });
    });

    app.post('/auth/login', passport.authenticate('local-login', {
        successRedirect : '/auth/profile',
        failureRedirect : '/auth/login',
        failureFlash : true
    }));

    app.get('/auth/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('./auth/signup', { message: req.flash('signupMessage') });
    });

    app.post('/auth/signup', passport.authenticate('local-signup', {
        successRedirect : '/auth/profile',
        failureRedirect : '/auth/signup',
        failureFlash : true
    }));

    app.get('/auth/profile', app.locals.isLoggedIn, function(req, res) {
        res.render('./auth/profile', {
            user : req.user
        });
    });

    app.get('/auth/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/auth/roles', app.locals.isLoggedIn, app.locals.isAdmin, function (req, res) {
        User.find({}, function (err, allUsers) {
            if (err) throw err;

            var sortedUsers = allUsers.sort(function (a, b) {
                if (a.role < b.role) {
                    return -1;
                } else if (a.role > b.role) {
                    return 1;
                } else {
                    return 0;
                }
            });

            res.render('./auth/roles', {
                users: sortedUsers,
                message: req.flash('rolesMessage')
            });
        });
    });

    app.get('/auth/changeRole/:id', app.locals.isLoggedIn, app.locals.isAdmin, function (req, res) {
        var id = req.params.id;
        if (id == req.user.id) {
            req.flash('rolesMessage', 'Промяната на собствената роля е забранена!')
            return res.redirect('/auth/roles');
        }

        User.findById(id, function (err, user) {
            if (err) throw err;

            user.role = user.role === 'admin' ? 'user' : 'admin';

            user.save(function (err) {
                if (err) throw err;
            });

            res.redirect('/auth/roles');
        });
    });

    app.get('/auth/changePassword', app.locals.isLoggedIn, app.locals.isAdmin, function (req, res) {
        res.render('./auth/changePassword', { message: req.flash('changePassword')});
    });

    app.post('/auth/changePassword', app.locals.isLoggedIn, app.locals.isAdmin, function (req, res) {
        if (!req.user.validPassword(req.body.oldPassword)) {
            req.flash('changePassword', 'Грешна стара парола');
            return res.redirect('/auth/changePassword');
        }

        if (req.body.newPassword != req.body.confirmPassword) {
            req.flash('changePassword', 'Грешка при потвърждаване на паролата');
            return res.redirect('/auth/changePassword');
        }

        req.user.local.password = req.user.generateHash(req.body.newPassword);
        req.user.save(function (err) {
            if (err) throw err;
        });
        res.redirect('/');
    });
};