require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

// const corsOptions = {
//   origin: "http://localhost:5000", // L'origine de votre frontend React
//   optionsSuccessStatus: 200, // Uniquement pour des navigateurs plus anciens
// };

app.use(cors());

app.route("/blog").get((req, res) => {
  res.status(200).send([
    {
      message: "enfin",
    },
  ]);
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
