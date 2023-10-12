import axios from "axios";
import { useState, useEffect } from "react";

const PreviewArticle = ({ idSelected }) => {
  const [article, setArticle] = useState({});
  useEffect(() => {
    async function fetchArticle() {
      const article = axios.get(
        `http://localhost:5000/api/getOneArticle/${idSelected}`
      );
      setArticle((await article).data);
    }
    fetchArticle();
  }, [idSelected]);
  return (
    <li
      className="flex flex-col p-5 bg-slate-800 mb-2 rounded-xl hover:translate-x-3 transition-transform fixed"
      style={{ width: "48vw" }}
    >
      <h2 className="text-3xl text-white underline uppercase">
        {article.title}
      </h2>
      <p className="italic text-gray-300">{article.description}</p>
      <p className="text-xl text-white">{article.content}</p>
      <div className="p-3">
        <button className="bg-green-500 text-center p-2 rounded-xl mr-3 font-bold hover:bg-green-800 transition">
          Edit ✏️
        </button>
        <button className="bg-red-100 text-center p-2 rounded-xl font-bold hover:bg-red-400 transition">
          delete ❌
        </button>
      </div>
    </li>
  );
};

export default PreviewArticle;
