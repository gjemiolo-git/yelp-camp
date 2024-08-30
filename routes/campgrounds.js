// Basics
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

// Utils
const wrapAsync = require('../utils/wrapAsync');

// Models and Schemas
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware.js');
const campgrounds = require('../controllers/campgrounds');


router.route('/')
    .get(wrapAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('images'), validateCampground, wrapAsync(campgrounds.createCampground),);

router.get('/new', isLoggedIn, campgrounds.renderNewForm);


router.route('/:id')
    .get(wrapAsync(campgrounds.showCampground))
    .delete(isLoggedIn, isAuthor, wrapAsync(campgrounds.deleteCampground))
    .put(isLoggedIn, isAuthor, upload.array('images'), wrapAsync(campgrounds.updateCampground));


router.get('/:id/edit', isLoggedIn, isAuthor, wrapAsync(campgrounds.renderEditForm));



module.exports = router;