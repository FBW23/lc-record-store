var faker = require("faker");
const mongoose = require("mongoose");
const User = require("../models/User");

console.log("Purging starts...");

/**CONNECT TO DB */
mongoose.connect("mongodb://localhost/record-shop", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})
.then(() => "Connecton established")
.catch(console.error)


User.deleteMany({})
.then(() => { 
  console.log("Users purged")
  mongoose.connection.close();
})
.catch(console.error)
