import axios from "axios";
import { useState } from "react";
import { API_URL } from "../config";
import { notification } from "antd";

const AuthForm = function ({ context, user, showModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [api, contextHolder] = notification.useNotification();
  async function SignInUserOrsignUp() {
    let pathApi;
    try {
      context === "signin" ? (pathApi = "signin") : (pathApi = "signup");
      const data = await axios.post(API_URL + "/api/user/" + pathApi, {
        email,
        password,
      });
      setEmail("");
      setPassword("");

      api["success"]({
        message: "welcome to blog AI 🖖🏽",
      });
      showModal(false);
      user(data.data.token);
    } catch (err) {
      api["error"]({
        message: err.response.data.error,
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await SignInUserOrsignUp();
  }

  return (
    <div className="p-5">
      {contextHolder}
      <h2 className="text-3xl text-center mb-10 uppercase underline underline-offset-8">
        {context === "signin" ? "Sign in" : "Sign Up"}
      </h2>

      <form className="flex" method="post" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-3 w-48">
          <label className="text-sm md:text-xl font-bold font-mono mb-5">
            Email :{" "}
          </label>

          <label className="text-sm md:text-xl font-bold font-mono md:mb-5">
            Password :{" "}
          </label>
          <br />
        </div>
        <div className="flex flex-col gap-3 grow">
          <input
            type="text"
            id="title"
            placeholder="Email : exemple@email.com"
            className="p-2 outline-none focus:outline-sky-600 transition bg-slate-400 placeholder:text-white"
            name="title"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            name="description"
            id="password"
            type="password"
            placeholder="Description"
            className="p-2 outline-none focus:outline-sky-600 transition bg-slate-400 placeholder:text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            value={"soumettre"}
            className="bg-sky-500 text-white p-2 hover:bg-sky-700 transition"
          >
            {" "}
            {context === "signin" ? "sign in" : "signup"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
