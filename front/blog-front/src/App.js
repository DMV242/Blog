import "./App.css";
import { useEffect, useState } from "react";
import Container from "./components/Container";
import Article from "./components/Article";
import axios from "axios";
import Box from "./components/Box";
import Header from "./components/Header";
import PreviewArticle from "./components/PreviewArticle";
import Form from "./components/Form.js";
import React from "react";
import { notification, Modal } from "antd";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [idSelected, setIdSelected] = useState(null);
  const [articles, setArticles] = useState([]);
  const [articleFounded, setArticleFounded] = useState([]);
  const [error, setError] = useState("");
  const [article, setArticle] = useState({});
  const [formVisible, setformVisible] = useState(false);
  const [formCreateVisible, setFormCreateVisible] = useState(false);

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchAllarticles = async () => {
      const data = await axios.get(
        "https://blog-api-wu4d.onrender.com/api/getAllarticles",
        {
          signal: controller.signal,
        }
      );
      setArticles(data.data);
    };
    fetchAllarticles();
    return function () {
      controller.abort();
    };
  }, [articles, articleFounded]);

  async function handleDelete(id, context = "") {
    const confirmation = window.confirm(
      "Etes-vous sûr de vouloir supprimer cet article ?"
    );

    if (confirmation) {
      try {
        await axios.delete(
          `https://blog-api-wu4d.onrender.com/api/deleteArticle/${id}`
        );

        if (context === "ArticlePreview") {
          setIdSelected(null);
        }

        setArticleFounded([]);
        api["success"]({
          message: "article deleted with success",
          placement: "bottomRight",
        });
      } catch (error) {
        console.error(
          "Une erreur s'est produite lors de la suppression de l'article :",
          error
        );
      }
    }
  }

  const handleSearch = async (query) => {
    try {
      const articleFind = await axios.post(
        `https://blog-api-wu4d.onrender.com/api/searchArticle/?by=content&query=${query}`
      );
      if (!query) {
        setArticleFounded([]);
        setError("");
        return;
      }

      setArticleFounded(articleFind.data);
      setError("");

      api["info"]({
        message: "article founded " + articleFind.data.length,
        placement: "bottomRight",
      });
    } catch (err) {
      setError(err.response.data.error + " 😅");
      api["error"]({
        message: err.response.data.error + " 😅",
        placement: "bottomLeft",
      });
    }
  };

  return (
    <div>
      {contextHolder}
      <Header
        onSearch={handleSearch}
        onCreate={setFormCreateVisible}
        showUpdateForm={setformVisible}
        showModal={setIsModalOpen}
      />
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
                      articleFounded={articleFounded}
                      onDelete={handleDelete}
                      showFormCreate={setFormCreateVisible}
                    />
                  ))
                : articles.map((article) => (
                    <Article
                      article={article}
                      key={article.title}
                      OnSelectArticle={setIdSelected}
                      onDelete={handleDelete}
                      showFormCreate={setFormCreateVisible}
                    />
                  ))}
            </ul>
          )}
        </Box>
        <Box context={"preview"}>
          {idSelected && (
            <>
              <PreviewArticle
                idSelected={idSelected}
                onDelete={handleDelete}
                onEdit={setformVisible}
                setArticle={setArticle}
                article={article}
                showFormCreate={setFormCreateVisible}
                showModal={setIsModalOpen}
              />
              {formVisible && (
                <Modal
                  open={isModalOpen}
                  onCancel={handleCancel}
                  width={600}
                  okButtonProps={{
                    style: {
                      display: "none",
                    },
                  }}
                >
                  <Form
                    idSelected={idSelected}
                    article={article}
                    context={"update"}
                  />
                </Modal>
              )}
            </>
          )}
          {formCreateVisible && (
            <Modal
              open={isModalOpen}
              onCancel={handleCancel}
              okButtonProps={{
                style: {
                  display: "none",
                },
              }}
            >
              <Form context={"create"} />
            </Modal>
          )}
        </Box>
      </Container>
    </div>
  );
}

export default App;
