const Article = ({
  article,
  OnSelectArticle,
  onDelete,
  showFormCreate,
  user,
}) => {
  function handleSelectId(newID) {
    showFormCreate(false);
    OnSelectArticle((lastID) => (newID === lastID ? null : newID));
  }

  async function handleDelete(id) {
    onDelete(id);
  }

  return (
    <li className="flex flex-col p-5 bg-slate-800 mb-2 rounded-xl hover:translate-x-3 transition-transform">
      <h2 className="text-2xl md:text-3xl text-white underline uppercase mb-5">
        {article.title}
      </h2>
      <p className="text-sm  md:text-lg italic text-gray-300 mb-2.5">
        {article.description}
      </p>
      <p className="text-lg md:text-xl text-white mb-4">
        {article.content.split(" ").slice(0, 24).join(" ") + " ..."}
      </p>
      <div className="p-3">
        <button
          className="bg-green-500 text-center p-2 rounded-xl mr-3 font-bold hover:bg-green-800 transition"
          onClick={() => handleSelectId(article._id)}
        >
          Select ✅
        </button>
        {user && (
          <button
            className="bg-red-100 text-center p-2 rounded-xl font-bold hover:bg-red-400 transition"
            onClick={() => handleDelete(article._id)}
          >
            delete ❌
          </button>
        )}
      </div>
    </li>
  );
};

export default Article;
