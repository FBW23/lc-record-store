var faker = require('faker');
const mongoose = require('mongoose');
const User = require('../models/User');

console.log('Seeding starts...');

/**CONNECT TO DB */
mongoose
  .connect('mongodb://localhost/record-shop', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => 'Connecton established')
  .catch(console.error);

console.log('I will purge all old users now...');

User.deleteMany({})
  .then(() => {
    console.log('Users purged');

    console.log(
      'I will start seeding users now like there is no morning...'
    );

    const userPromises = [];

    for (let i = 0; i < 10; i++) {
      const user = new User({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      });
      let userProm = user.save();
      userPromises.push(userProm);
    }

    Promise.all(userPromises)
      .then(() => {
        console.log('Users seeded');
        mongoose.connection.close();
      })
      .catch(console.error); // errors of seeding
  })
  .catch(console.error); // errors of deletion
