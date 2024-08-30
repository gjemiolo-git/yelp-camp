maptilersdk.config.apiKey = maptilerApiKey;

const map = new maptilersdk.Map({
    container: 'map',
    style: maptilersdk.MapStyle.BRIGHT,
    center: campground.geometry.coordinates, // starting position [lng, lat]
    zoom: 10 // starting zoom
});

const popup = new maptilersdk.Popup({ offset: 25 })
    .setHTML(
        `<h3>${campground.title}</h3><p>${campground.location}</p>`
    );

new maptilersdk.Marker()
    .setLngLat(campground.geometry.coordinates)
    .setPopup(popup)
    .addTo(map);
