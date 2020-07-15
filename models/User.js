const mongoose = require('mongoose');
const { Schema } = mongoose;
const jwt = require('jsonwebtoken');
const { NotExtended } = require('http-errors');
const bcrypt = require('bcrypt');

const ourSecret = 'this is a string we choose freely';


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
  role: {
    type: String, // User, Admin
    required: true,
    enum: ["User", "Admin"],
    default: "User"
  },
  address: AddressSchema,
});

// UserSchema.methods => are called like this: user.myFunc()
// UserSchema.statics => are called like this: User.myFunc()

// user.checkPw // => user => this
UserSchema.methods.checkPw = function(pwPlain) {
  const user = this;
  // compare the password received from the user with hashed one stored
  return bcrypt.compareSync(pwPlain, user.password)
}

// Whenever we call "res.send(user)" to send back user info
// this function will be called by mongoose automatically
// here we can hide fields that a frontend should never see
UserSchema.methods.toJSON = function() {
  let user = this.toObject() // this == document instance => save()
  delete user["password"] // hide password field
  return user
}

UserSchema.methods.generateToken = function () {
  const user = this;

  const token = jwt.sign(
    { _id: user._id.toHexString() },
    ourSecret
  );


  return token;
};

// PRE SAVE HOOK / MIDDLEWARE
UserSchema.pre("save", function() {
  
  try {
    const user = this // => user.save() | user => this
    if(user.isModified('password')) {
      user.password = bcrypt.hashSync(user.password, 10)
    }
  }
  catch(err) {
    console.log(err)
  }

})


UserSchema.statics.findByToken = function (token) {
  const User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, ourSecret);
  } catch (error) {
    return;
  }

  return User.findOne({
    _id: decoded._id,
  });
};

module.exports = mongoose.model('User', UserSchema);
