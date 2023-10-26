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
import { API_URL } from "./config";
import AuthForm from "./components/AuthForm";

function App() {
  const [signUpForm, setSignUpForm] = useState(true);
  const [signInForm, setSignInform] = useState(false);
  const [user, setUser] = useState("");
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
    const abortController = new AbortController();
    const fetchAllarticles = async () => {
      try {
        const data = axios.get(API_URL + "/api/getAllarticles", {
          signal: abortController.signal,
        });
        const allArticles = await data;

        setArticles(allArticles.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("La requête a été annulée", err.message);
        } else {
          console.log("erreur ", err.message);
          console.log("err", err.name);
        }
      }
    };
    fetchAllarticles();
    return function () {
      abortController.abort();
    };
  }, []);

  async function handleDelete(id, context = "") {
    const confirmation = window.confirm(
      "Etes-vous sûr de vouloir supprimer cet article ?"
    );

    if (confirmation) {
      try {
        await axios.delete(`${API_URL}/api/deleteArticle/${id}`);

        if (context === "ArticlePreview") {
          setIdSelected(null);
          setArticle({});
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
        `${API_URL}/api/searchArticle/?by=content&query=${query}`
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
        user={user}
        setUser={setUser}
        signInForm={setSignInform}
        signUpForm={setSignUpForm}
      />
      <Container idSelected={idSelected}>
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
                      user={user}
                    />
                  ))
                : articles.map((article) => (
                    <Article
                      article={article}
                      key={article.title}
                      OnSelectArticle={setIdSelected}
                      onDelete={handleDelete}
                      showFormCreate={setFormCreateVisible}
                      user={user}
                    />
                  ))}
            </ul>
          )}
        </Box>

        {idSelected && (
          <Box context={"preview"}>
            {idSelected && (
              <PreviewArticle
                idSelected={idSelected}
                onDelete={handleDelete}
                onEdit={setformVisible}
                setArticle={setArticle}
                article={article}
                showFormCreate={setFormCreateVisible}
                showModal={setIsModalOpen}
                user={user}
              />
            )}
          </Box>
        )}
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
              user={user}
            />
          </Modal>
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
            <Form context={"create"} user={user} />
          </Modal>
        )}
        {signInForm && (
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
            <AuthForm
              context={"signin"}
              user={setUser}
              showModal={setIsModalOpen}
            />
          </Modal>
        )}
        {signUpForm && (
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
            <AuthForm
              context={"signup"}
              user={setUser}
              showModal={setIsModalOpen}
            />
          </Modal>
        )}
      </Container>
    </div>
  );
}

export default App;
