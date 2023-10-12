import axios from "axios";

const Article = ({ article, OnSelectArticle, onDelete }) => {
  function handleSelectId(newID) {
    OnSelectArticle((lastID) => (newID === lastID ? null : newID));
  }

  // function handleDelete(id) {
  //   console.log("entrer");
  //   const deleteArticle = async () => {
  //     await axios.delete(`http://localhost:5000/api/deleteArticle/${id}`);
  //   };
  //   const confirmation = window.confirm(
  //     "Etes vous de vouloir supprimer cet article ?"
  //   );

  //   onDelete([]);
  //   deleteArticle();
  // }
  async function handleDelete(id) {
    console.log("entrer");
    const confirmation = window.confirm(
      "Etes-vous sûr de vouloir supprimer cet article ?"
    );

    if (confirmation) {
      try {
        await axios.delete(`http://localhost:5000/api/deleteArticle/${id}`);
        onDelete([]);
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la suppression de l'article :",
          error
        );
      }
    }
  }

  return (
    <li className="flex flex-col p-5 bg-slate-800 mb-2 rounded-xl hover:translate-x-3 transition-transform">
      <h2 className="text-3xl text-white underline uppercase">
        {article.title}
      </h2>
      <p className="italic text-gray-300">{article.description}</p>
      <p className="text-xl text-white">{article.content}</p>
      <div className="p-3">
        <button
          className="bg-green-500 text-center p-2 rounded-xl mr-3 font-bold hover:bg-green-800 transition"
          onClick={() => handleSelectId(article._id)}
        >
          Select ✅
        </button>
        <button
          className="bg-red-100 text-center p-2 rounded-xl font-bold hover:bg-red-400 transition"
          onClick={() => handleDelete(article._id)}
        >
          delete ❌
        </button>
      </div>
    </li>
  );
};

export default Article;
