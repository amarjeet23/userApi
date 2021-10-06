const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    min: [5, 'name must be atleast 5 character long'],
    max: [20, 'name should not be more than 20 character']
  },
  email: {
    type: String,
    required: [true, 'E-mail is required'],
    unique: [true, 'email must be unique'],
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Invalid email format'],
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    min: [5, 'password must be atleast 5 character long'],
    max: [20, 'password should not be more than 20 character']
  },
  role: {
    type: Number,
    required: false,
    default: 0
  }
});
module.exports = mongoose.model("User", userSchema);