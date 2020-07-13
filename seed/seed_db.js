var faker = require('faker');
const mongoose = require('mongoose');
const User = require('../models/User');
const Record = require('../models/Record');
const Order = require('../models/Order');
const { seed } = require('faker');

(async function () {
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

  /** DELETE ALL USERS AND RECORDS AND ORDERS*/
  try {
    await User.deleteMany({});
    console.log(
      'Old users moved to a better place. Spandau'
    );
  } catch (e) {
    console.log(e);
  }

  try {
    await Order.deleteMany({});
    console.log(
      'Old orders moved to a better place. Spandau'
    );
  } catch (e) {
    console.log(e);
  }

  try {
    await Record.deleteMany({});
    console.log(
      'Old records moved to a better place. Spandau'
    );
  } catch (e) {
    console.log(e);
  }

  /** CREATE 20 FAKE USERS */
  console.log('Create 20 new fake users');

  const userPromises = Array(20)
    .fill(null)
    .map(() => {
      const user = new User({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        address: {
          city: faker.address.city(),
          street: faker.address.streetName(),
        },
      });

      // const token = user.generateToken();
      return user.save();
    });

  try {
    await Promise.all(userPromises);
    console.log('I just created 20 users');
  } catch (error) {
    console.log(error);
  }

  /** CREATE 20 FAKE RECORDS */
  console.log('Create 20 new fake records');

  const recordPromises = Array(20)
    .fill(null)
    .map(() => {
      const record = new Record({
        title: faker.random.words(),
        artist: faker.internet.userName(),
        year: new Date(faker.date.past()).getFullYear(),
        price: faker.finance.amount(),
        img: faker.image.fashion(),
      });
      // const token = user.generateToken();
      return record.save();
    });

  try {
    await Promise.all(recordPromises);
    console.log('I just created 20 records');
  } catch (error) {
    console.log(error);
  }

  /** CREATE 20 FAKE ORDERS */
  console.log('Create 20 new fake orders');

  const orderPromises = Array(20)
    .fill(null)
    .map(async () => {
      // we have 20 records
      const records = await Record.find();
      const orderIds = records.filter((el) => {
        const randomNumber = Math.random();
        if (randomNumber > 0.5) {
          return el._id;
        }
      });

      const order = new Order({
        quantity: faker.random.number(0, 10),
        records: orderIds,
      });

      return order.save();
    });

  try {
    await Promise.all(orderPromises);
    console.log('I just created 20 orders');
  } catch (error) {
    console.log(error);
  }

  mongoose.connection.close();
})();
