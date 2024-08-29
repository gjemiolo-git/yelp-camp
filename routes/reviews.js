// Basics
const express = require('express');
const router = express.Router({ mergeParams: true });

// Utils
const wrapAsync = require('../utils/wrapAsync');

// Models and Schemas
const reviews = require('../controllers/reviews');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware.js');


router.post('/', isLoggedIn, validateReview, wrapAsync(reviews.createReview));

router.delete('/:rid', isLoggedIn, isReviewAuthor, wrapAsync(reviews.deleteReview))

module.exports = router;