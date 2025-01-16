const mongoose = require("mongoose");
const { string } = require("zod");
mongoose.connect(
  "mongodb+srv://arvind:Shahi1234@cluster0.9xbts.mongodb.net/Paytm"
);
const userSchema = mongoose.Schema({
  UserName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: 3,
    maxLength: 30,
  },
  FirstName: {
    type: String,
    required: true,
    maxLength: 50,
  },
  LastName: {
    type: String,
    required: true,
    maxLength: 50,
  },
  Password: {
    type: String,
    required: true,
    minLength: 6,
  },
});

const User = mongoose.model("users", userSchema);
const accountSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: User,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});
const Account = mongoose.model("Account", accountSchema);
module.exports = {
  User,
  Account,
};
