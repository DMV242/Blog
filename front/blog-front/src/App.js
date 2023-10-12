import "./App.css";
import { useEffect, useState } from "react";
import Container from "./components/Container";
import Article from "./components/Article";
import axios from "axios";
import Box from "./components/Box";
import Header from "./components/Header";
import PreviewArticle from "./components/PreviewArticle";

function App() {
  const [idSelected, setIdSelected] = useState(null);
  const [articles, setArticles] = useState([]);
  const [articleFounded, setArticleFounded] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAllarticles = async () => {
      const data = await axios.get("http://localhost:5000/api/getAllarticles");
      setArticles(data.data);
    };
    fetchAllarticles();
  }, [articles, articleFounded]);

  const handleSearch = async (query) => {
    try {
      const articleFind = await axios.post(
        `http://localhost:5000/api/searchArticle/?by=content&query=${query}`
      );
      if (!query) {
        setArticleFounded([]);
        return;
      }
      setArticleFounded(articleFind.data);
      setError("");
    } catch (err) {
      setError(err.response.data.error + " 😅");
    }
  };

  return (
    <div>
      <Header onSearch={handleSearch} />
      <Container>
        <Box>
          {error && (
            <p className="text-center text-red-600 text-2xl"> {error}</p>
          )}
          {!error && (
            <ul className="first:mt-3 ml-4">
              {articleFounded.length
                ? articleFounded.map((article) => (
                    <Article
                      article={article}
                      key={article.title}
                      OnSelectArticle={setIdSelected}
                      onDelete={setArticleFounded}
                      articleFounded={articleFounded}
                    />
                  ))
                : articles.map((article) => (
                    <Article
                      article={article}
                      key={article.title}
                      OnSelectArticle={setIdSelected}
                    />
                  ))}
            </ul>
          )}
        </Box>
        <Box>{idSelected && <PreviewArticle idSelected={idSelected} />}</Box>
      </Container>
    </div>
  );
}

export default App;
