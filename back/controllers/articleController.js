import { articleModel } from "../models/articlesModel";

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
