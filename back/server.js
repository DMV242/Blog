require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { routeArticle } = require("./routes/routesArticle");
const { routesUsers } = require("./routes/routesUsers");

(async () => {
  try {
    await mongoose.connect(process.env.CONNECTIONPATH);
    console.log("connection réussie à la base données");
  } catch (err) {
    console.log(err.message);
  }
})();

const corsOptions = {
  origin: ["https://blog-mern-dmv242.netlify.app", "http://localhost:3000"],

  optionsSuccessStatus: 200,
};

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.route("/api/blog").get((req, res) => {
  res.status(200).send({
    message: "Bienvenue sur l'api de David Mvoula",
  });
});

routesUsers(app);
routeArticle(app);

app.route("*").all((req, res) => {
  res.status(400).json({
    error: "this route " + req.originalUrl + " doesn't exist in this Api",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
