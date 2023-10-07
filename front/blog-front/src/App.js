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
        const response = await axios.get("api/blog");
        setMessage(response.data.message);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchMessage();
  }, []);
  return <h1 className="text-3xl font-bold underline">{message}</h1>;
}

export default App;
