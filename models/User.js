const mongoose = require('mongoose');
const { Schema } = mongoose;
const jwt = require('jsonwebtoken');
// currently we just plan to use an address in a user
// once we use address also in other documents we will outsource the schema to an own file
const AddressSchema = new Schema(
  {
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: AddressSchema,
});

UserSchema.methods.generateToken = function () {
  const user = this;
  const ourKey = 'this is a string we choose freely';

  const token = jwt.sign(
    { _id: user._id.toHexString() },
    ourKey
  );

  return token;
};

module.exports = mongoose.model('User', UserSchema);
