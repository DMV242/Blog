require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { routeArticle } = require("./routes/routesArticle");

(async () => {
  try {
    await mongoose.connect(process.env.CONNECTIONPATH);
    console.log("connection réussie à la base données");
  } catch (err) {
    console.log(err.message);
  }
})();

const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.route("/api/blog").get((req, res) => {
  res.status(200).send({
    message: "Bienvenue sur l'api de David Mvoula",
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});

routeArticle(app);
