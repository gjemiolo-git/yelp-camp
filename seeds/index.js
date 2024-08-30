const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 1000)
        const camp = new Campground({
            title: `${sample(descriptors)} ${sample(places)}`,
            geometry: {
                type: 'Point',
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            images: [
                {
                    url: `https://picsum.photos/400?random=${Math.random()}`,
                    filename: 'name'
                },
                {
                    url: `https://picsum.photos/400?random=${Math.random()}`,
                    filename: 'name'
                },
                {
                    url: `https://picsum.photos/400?random=${Math.random()}`,
                    filename: 'name'
                }
            ],
            description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis facere quae quibusdam magni modi nihil amet cumque fugit eaque fuga accusantium dicta temporibus assumenda sequi recusandae, voluptate dolor, placeat consequuntur!
Ad obcaecati ex deleniti nesciunt, fugit maiores pariatur similique quis impedit adipisci culpa tenetur provident aspernatur optio delectus molestias ratione, sapiente explicabo earum quisquam voluptate! Architecto ad asperiores mollitia ipsam.
Optio libero soluta repellendus distinctio ducimus quod dolorum voluptatibus sed, amet, voluptatem nemo veniam commodi sit. Ad quod maiores eligendi ullam nemo voluptas, nisi, optio quasi molestiae earum eveniet autem?
Soluta, voluptatum qui! Alias natus quod a nam omnis laborum corporis quos accusamus quas tempore! Aperiam repudiandae provident a, praesentium odio optio nulla, accusantium harum maxime corporis ex quod? Nemo!
Cum odio corporis facilis maiores, nobis quisquam officiis totam. Quaerat possimus quia, eius asperiores fugiat harum consequuntur praesentium laboriosam ex, atque esse sunt, labore adipisci nulla officia. Ducimus, sed natus!`,
            price,
            author: '66cda3724f12089930ee7dc0'
        })
        await camp.save();
    }

    console.log("New campground saved");
}

seedDB().then(() => {
    mongoose.connection.close();
});