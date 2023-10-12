require("dotenv").config();
import { articleModel } from "../models/articlesModel";

// ---------------------- CRUD ROUTES -----------------------------

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

//---------------------- ORDER ROUTES -----------------------------
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
      const articlesOrderByDescription = await articleModel.find({}).sort(ob);
      res.send(articlesOrderByDescription);
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
};

//---------------------- ARTICLE ROUTE WITH AI -----------------------------

export const articleWithAi = async function (req, res) {
  try {
    const { context, keywords, prompt, source_lang, target_lang } = req.query;
    const keywordsArr = keywords.split(",");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.API_KEY,
      },
      body: JSON.stringify({
        context: context,
        keywords: keywordsArr,
        max_tokens: 512,
        model: "chat-sophos-1",
        n: 1,
        source_lang: source_lang ? source_lang : "fr",
        target_lang: target_lang ? target_lang : "fr",
        temperature: 0.65,
        title: prompt,
      }),
    };
    const response = await fetch(process.env.AI_URL, options);

    const { data } = await response.json();

    res.status(200).send(data.outputs[0].text);
  } catch (err) {
    res.status(500).send({
      error: err.message,
    });
  }
};

//---------------------- RESEARCH ROUTES -----------------------------

export const searchArticle = async function (req, res) {
  const { query, by } = req.query;
  const queryRegExp = new RegExp(query);

  try {
    if (by === "categories") {
      const articlesByCategories = await articleModel.find({
        categories: queryRegExp,
      });
      if (articlesByCategories.length === 0)
        throw new Error("article not found");
      return res.status(200).send(articlesByCategories);
    } else if (by === "content") {
      const articlesByContent = await articleModel.find({
        content: queryRegExp,
      });
      if (articlesByContent.length === 0) throw new Error("article not found");
      return res.status(200).send(articlesByContent);
    } else {
      const articlesByTitle = await articleModel.find({
        title: queryRegExp,
      });
      if (articlesByTitle.length === 0) throw new Error("article not found");
      return res.status(200).send(articlesByTitle);
    }
  } catch (err) {
    res.status(404).json({
      error: "No article found with this" + query,
      msg: err.message,
    });
  }
};
