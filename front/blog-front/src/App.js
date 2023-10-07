import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  //eslint-disable-next-line
  useEffect(() => {
    async function fetchMessage() {
      try {
        const response = await axios.get("/blog");
        setMessage(response.data[0].message);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchMessage();
  }, []);
  return <h1>{message}</h1>;
}

export default App;
