import { UserModel } from "../models/userModel";

const jwt = require("jsonwebtoken");
require("dotenv").config();

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const checkIfEmailAndPassword = function (email, password) {
  if (!email || !password) {
    throw new Error("You need to provide email and password");
  }
};

export const signUp = async function (req, res, next) {
  try {
    const { email, password } = req.body;
    checkIfEmailAndPassword(email, password);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("the mail address is not valid");
    }

    if (password.length < 8) {
      throw new Error(
        "the password is too shorter . You need to give at least 8 characters"
      );
    }
    const userAlready = await UserModel.findOne({ email });
    console.log(userAlready);
    if (userAlready) {
      throw new Error("this email has been used by another account");
    }

    const newUser = await UserModel.create({ email, password });
    const token = signToken(newUser._id);
    return res.status(201).send({ user: newUser, token });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
export const signIn = async function (req, res, next) {
  try {
    const { email, password } = req.body;

    checkIfEmailAndPassword(email, password);

    const currentUser = await UserModel.findOne({ email: email }).select(
      "+password"
    );
    if (
      !currentUser ||
      !(await currentUser.correctPassword(password, currentUser.password))
    ) {
      throw Error("the authenfication credentials are incorrect");
    }
    const token = signToken(currentUser._id);
    res.status(201).json({ status: "succes", token: token });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
