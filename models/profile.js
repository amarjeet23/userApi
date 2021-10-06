const mongoose = require("mongoose");
const profileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Firstname is required'],
    min: [5, 'firstName must be atleast 5 character long'],
    max: [20, 'firstName should not be more than 20 character']
  },
  lastName: {
    type: String,
    required: false,
    min: [5, 'lastName must be atleast 5 character long'],
    max: [20, 'lastName should not be more than 20 character']
  },
  email: {
    type: String,
    required: [true, 'E-mail is required'],
    unique: [true, 'email must be unique'],
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Invalid email format'],
  },
});
module.exports = mongoose.model("Profile", profileSchema);
