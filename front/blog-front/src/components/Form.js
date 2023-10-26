import axios from "axios";
import { notification } from "antd";
import { useState } from "react";
import { API_URL } from "../config";

const Form = ({ idSelected, article, context, user }) => {
  const [description, setDescription] = useState(
    context === "create" ? "" : article.description
  );
  const [content, setContent] = useState(
    context === "create" ? "" : article.content
  );
  const [title, setTitle] = useState(context === "create" ? "" : article.title);
  const [categories, setCategories] = useState(
    context === "create" ? "" : article.categories.join(",")
  );
  const [api, contextHolder] = notification.useNotification();

  function handleSubmit(e) {
    e.preventDefault();
    try {
      if (context === "update") {
        axios.put(`${API_URL}/api/updateArticle/${idSelected}`, {
          data: {
            title: title ? title : article.title,
            content: content ? content : article.content,
            categories: categories ? categories : article.categories.join(","),
            description: description ? description : article.description,
          },
        });
        api["success"]({
          message: "article successfully updated 🎉",
          placement: "bottomRight",
        });
      } else if (context === "create") {
        axios.post(API_URL + "/api/addArticle", {
          content,
          title,
          description,
          categories,
          id: user._id,
        });
        api["success"]({
          message: "article successfully created 🎉",
          placement: "bottomRight",
        });
      } else {
        return;
      }
    } catch (err) {
      api["error"]({
        message: err.message,
        placement: "bottomRight",
      });
    }
  }

  return (
    <div className="p-5">
      {context === "create" && (
        <h2 className="text-3xl text-center mb-10 uppercase underline underline-offset-8">
          Create Article
        </h2>
      )}
      <form className="flex" method="post" onSubmit={handleSubmit}>
        {contextHolder}
        <div className="flex flex-col gap-3 w-48">
          <label className="text-sm md:text-xl font-bold font-mono mb-5">
            Title :{" "}
          </label>
          <br />

          <label className="text-sm md:text-xl font-bold font-mono mb-2  md:mb-5">
            Description:{" "}
          </label>
          <br />

          <label className="text-sm md:text-xl font-bold font-mono mb-5">
            Catégories :
          </label>
          <br />

          <label className="text-sm md:text-xl font-bold font-mono md:mb-5">
            Content :{" "}
          </label>
          <br />
        </div>
        <div className="flex flex-col gap-3 grow">
          <input
            type="text"
            id="title"
            placeholder="title"
            className="p-2 outline-none focus:outline-sky-600 transition bg-slate-400 placeholder:text-white"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
          <input
            name="description"
            id="description"
            type="text"
            placeholder="Description"
            className="p-2 outline-none focus:outline-sky-600 transition bg-slate-400 placeholder:text-white"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <br />
          <input
            name="categories"
            id="categories"
            type="text"
            placeholder="Catégories"
            className="p-2 outline-none focus:outline-sky-600 transition bg-slate-400 placeholder:text-white"
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
          />
          <br />
          <textarea
            className="p-2 outline-none focus:outline-sky-600 transition bg-slate-400 placeholder:text-white"
            name="content"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            type="submit"
            value={"soumettre"}
            className="bg-sky-500 text-white p-2 hover:bg-sky-700 transition"
          >
            {" "}
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
