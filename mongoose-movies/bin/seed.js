// const mongoose = require('mongoose');
// const faker = require('faker');
// const Celebrity = require('../models/Celebrity');

// mongoose.connect('mongodb://localhost/mycelebrities', {
//   useNewUrlParser: true,
// });

// const celebrities = Array.from({ length: 40 }, () => ({
//   name: faker.name.firstName(),
//   occupation: faker.hacker.adjective(4),
//   catchPhrase: faker.hacker.phrase(),
// }));

// Celebrity.collection
//   .drop()
//   .then(() => {
//     console.log('deleted db');
//   })
//   .catch((err) => {
//     console.log(err);
//   })
//   .then(() => Celebrity.insertMany(celebrities))
//   .then(() => {
//     console.log('inserted fake data');
//     mongoose.connection.close();
//   })
//   .catch((err) => {
//     console.log(err);
//     mongoose.connection.close();
//   });

const mongoose = require('mongoose');
const faker = require('faker');
const Movie = require('../models/Movie');

mongoose.connect('mongodb://localhost/mycelebrities', {
  useNewUrlParser: true,
});

const movies = Array.from({ length: 40 }, () => ({
  title: faker.name.firstName(),
  genre: faker.hacker.adjective(1),
  catchPhrase: faker.hacker.phrase(),
}));

Movie.collection
  .drop()
  .then(() => {
    console.log('deleted db');
  })
  .catch((err) => {
    console.log(err);
  })
  .then(() => Movie.insertMany(movies))
  .then(() => {
    console.log('inserted fake data');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
    mongoose.connection.close();
  });
