const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "you need to provide email"],
    validate: [validator.isEmail, "You need to provide valide email"],
  },
  password: {
    type: String,
    required: [true, "you need to provide a pasword"],
    minlength: 8,
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.correctPassword = async function (
  CandidatePassword,
  password
) {
  return await bcrypt.compare(CandidatePassword, password);
};

export const UserModel = mongoose.model("user", userSchema);
