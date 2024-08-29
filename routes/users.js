const express = require('express');
const router = express.Router({ mergeParams: true });
const users = require(`../controllers/users`);

const wrapAsync = require('../utils/wrapAsync');
const passport = require('passport');
const { storeReturnTo } = require('../middleware');

router.route('/login')
    .get(storeReturnTo, users.renderLoginForm)
    .post(storeReturnTo,
        passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }),
        wrapAsync(users.loginUser))

router.route('/register')
    .get(users.renderRegisterForm)
    .post(wrapAsync(users.register));

router.get('/logout', storeReturnTo, users.logoutUser);

module.exports = router;