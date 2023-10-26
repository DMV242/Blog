import { signUp, signIn } from "../controllers/authController";

export function routesUsers(app) {
  app.route("/api/user/signup").post(signUp);
  app.route("/api/user/signin").post(signIn);
}
