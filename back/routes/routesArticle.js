import {
  createArticle,
  deleteArticle,
  updateArticle,
  getArticles,
  getOneArticle,
  orderArticle,
  articleWithAi,
} from "../controllers/articleController";

export function routeArticle(app) {
  // CRUD ROUTES
  app.route("/api/addArticle/").post(createArticle);
  app.route("/api/deleteArticle/:articleID").delete(deleteArticle);
  app.route("/api/updateArticle/:articleID").put(updateArticle);
  app.route("/api/getAllarticles").get(getArticles);
  // One article route
  app.route("/api/getOneArticle/:articleID").get(getOneArticle);
  //Filter article by field
  app.route("/api/orderArticle").get(orderArticle);
  // Rediger article avec L'IA
  app.route("/api/ArticleWithAI").post(articleWithAi);
}
