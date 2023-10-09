import { articleModel } from "../models/articlesModel";

// CRUD ROUTES

export const createArticle = async function (req, res) {
  const { title, content, description, categories } = req.query;
  try {
    const newArticle = new articleModel({
      title,
      content,
      description,
      categories: categories.split(","),
    });

    const data = await newArticle.save();
    res.send(data);
  } catch (err) {
    res.status(500).send({ message: err });
  }
};
export const getOneArticle = async function (req, res) {
  try {
    const response = await articleModel.findById(req.params.articleID);
    res.send(response);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const deleteArticle = async function (req, res) {
  try {
    const response = await articleModel.findByIdAndDelete({
      _id: req.params.articleID,
    });
    res.send(response);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

export const getArticles = async function (req, res) {
  try {
    const data = await articleModel.find({});
    res.send(data);
  } catch (err) {
    res.status(500).send("failed to fecth");
  }
};

export const updateArticle = async function (req, res) {
  try {
    const response = await articleModel.findByIdAndUpdate(
      {
        _id: req.params.articleID,
      },
      req.query,
      { new: true }
    );

    res.send(response);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// ORDER ROUTES
export const orderArticle = async function (req, res) {
  const { ob } = req.query;
  try {
    if (ob === "categories") {
      const articlesOrderByCategorie = await articleModel.find({}).sort(ob);
      res.send(articlesOrderByCategorie);
    }
    if (ob === "title") {
      const articlesOrderByTitle = await articleModel.find({}).sort(ob);
      res.send(articlesOrderByTitle);
    }
    if (ob === "content") {
      const articlesOrderByContent = await articleModel.find({}).sort(ob);
      res.send(articlesOrderByContent);
    }
    if (ob === "created_date") {
      const articlesOrderByDate = await articleModel.find({}).sort(ob);
      res.send(articlesOrderByDate);
    }
    if (ob === "description") {
      const articlesOrderByDate = await articleModel.find({}).sort(ob);
      res.send(articlesOrderByDate);
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};
