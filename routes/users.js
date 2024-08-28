const express = require('express');
const router = express.Router({ mergeParams: true });

const User = require('../models/user');

const ExpressError = require('../utils/ExpressError');
const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');

router.get('/register', (req, res) => {
    res.render('users/register');
})

router.get('/login', storeReturnTo, (req, res) => {
    res.render('users/login');
})

router.post('/login', storeReturnTo,
    passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),
    wrapAsync(async (req, res) => {
        req.flash('success', 'Successfully logged in!');
        const redirectUrl = res.locals.returnTo || '/campgrounds';
        res.redirect(redirectUrl);
    }))

router.get('/logout', storeReturnTo, (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        const redirectUrl = res.locals.returnTo || '/campgrounds';
        res.redirect(redirectUrl);
    });
})

router.post('/register', wrapAsync(async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const newUser = await User.register(user, password);
        req.login(newUser, function (err) {
            if (err) { return next(err); }
            req.flash('success', `Successfully made new user ${newUser.username}`)
            res.redirect(`/campgrounds`);
        })

    } catch (e) {
        req.flash('error', `${e.message}`);
        res.redirect(`/register`);
    }
}))

module.exports = router;