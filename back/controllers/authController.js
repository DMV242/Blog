import { UserModel } from "../models/userModel";
import { sendEmail } from "../utils/email";
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

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

    if (userAlready) {
      throw new Error("this email has been used by another account");
    }

    const newUser = await UserModel.create({ email, password });
    const activeTokenAccount = newUser.createActivateAccountToken();
    await newUser.save();
    const mailOptions = {
      to: newUser.email,
      subject: "Activate your account",
      text:
        "Bienvenue sur notre plateforme de blog AI ! 🎉 Nous sommes ravis de t'accueillir dans notre communauté. Ici, tu découvriras un univers où l'intelligence artificielle rencontre la créativité humaine. 🤖✨ Que ce soit pour partager tes idées, apprendre quelque chose de nouveau ou simplement t'inspirer, tu es au bon endroit. 📝💡 Explore nos articles, participe aux discussions et fais de cette expérience une aventure enrichissante. 🌟 N'hésite pas à t'impliquer et à laisser libre cours à ta curiosité. 🚀 Nous sommes impatients de voir ce que tu apporteras à notre communauté ! 🌈😊 ! Activez votre compte en cliquant sur http://localhost:5000/api/user/activateAccount/" +
        activeTokenAccount,
      html: `<div> <h1>Bienvenue sur notre plateforme de blog AI ! 🎉</h1><p>Nous sommes ravis de t'accueillir dans notre communauté. Ici, tu découvriras un univers où l'intelligence artificielle rencontre la créativité humaine. 🤖✨ Que ce soit pour partager tes idées, apprendre quelque chose de nouveau ou simplement t'inspirer, tu es au bon endroit. 📝💡 Explore nos articles, participe aux discussions et fais de cette expérience une aventure enrichissante. 🌟 N'hésite pas à t'impliquer et à laisser libre cours à ta curiosité. 🚀 Nous sommes impatients de voir ce que tu apporteras à notre communauté ! 🌈😊</p>Activez votre compte en cliquant sur <a href='http://localhost:5000/api/user/activateAccount/${activeTokenAccount}'>ce lien</a> </body></div>`,
    };
    await sendEmail(mailOptions);
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
    req.user = currentUser;
    res.status(200).json({
      status: "succes",
      token: token,
      user: {
        email: currentUser.email,
        active: currentUser.active,
      },
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const activeAccount = async function (req, res) {
  const { token } = req.params;
  const tokenEncrypted = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const userUnactive = await UserModel.findOne({
    activateAccountToken: tokenEncrypted,
  });
  if (!userUnactive) {
    return res.status(400).json({
      status: "error",
      message: "the token is invalid or expired",
    });
  }

  userUnactive.active = true;
  userUnactive.activateAccountToken = undefined;
  await userUnactive.save({ validateBeforeSave: false });
  res.status(200).json({
    status: "succes",
    message: "your account is active now",
  });
};
