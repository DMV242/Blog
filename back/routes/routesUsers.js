import { signUp, signIn, activeAccount } from "../controllers/authController";

export function routesUsers(app) {
  app.route("/api/user/signup").post(signUp);
  app.route("/api/user/signin").post(signIn);
  app.route("/api/user/activateAccount/:token").get(activeAccount);
}
