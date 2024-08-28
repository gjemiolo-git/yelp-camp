// Basics
const express = require('express');
const router = express.Router();

// Utils
const wrapAsync = require('../utils/wrapAsync');

// Models and Schemas
const Campground = require('../models/campground');
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware.js');

router.get('/', async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
})

router.get('/new', isLoggedIn, (req, res) => {
    res.render('campgrounds/new');
})

router.post('/', isLoggedIn, validateCampground, wrapAsync(async (req, res) => {
    const campground = new Campground(req.body.campground);
    campground.author = req.user._id
    await campground.save();
    req.flash('success', 'Successfully made new campground!')
    res.redirect(`/campgrounds/${campground._id}`);
}))

router.get('/:id', wrapAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id).populate({
        path: 'reviews',
        populate: { path: 'author' }
    }).populate('author');
    if (!campground) {
        req.flash('error', 'No campground could be found.');
        return res.redirect(`/campgrounds`);
    }
    res.render('campgrounds/show', { campground });
}))

router.get('/:id/edit', isLoggedIn, isAuthor, wrapAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    if (!campground) {
        req.flash('error', 'No campground could be found.');
        return res.redirect(`/campgrounds`);
    }
    res.render('campgrounds/edit', { campground });
}))


router.delete('/:id', isLoggedIn, isAuthor, wrapAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted campground!')
    res.redirect(`/campgrounds`);
}))

router.put('/:id', isLoggedIn, isAuthor, wrapAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    req.flash('success', 'Successfully updated campground!')
    res.redirect(`/campgrounds/${campground._id}`);
}))

module.exports = router;