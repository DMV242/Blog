import { Input } from "antd";
import axios from "axios";
import { useState } from "react";

const Header = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [isloading, setIsloading] = useState(false);

  async function handleSubmit(e) {
    setIsloading(true);
    e.preventDefault();
    await onSearch(query);
    setIsloading(false);
    setQuery("");
  }

  return (
    <header className=" bg-sky-500/75 p-5 flex items-center justify-items-center justify-between">
      <h1 className="text-4xl m-4 text-white font-bold"> Blog AI✍🏽</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            className="p-2 outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          ></input>
          <button className="bg-sky-500/75 p-2 text-white" type="submit">
            {isloading ? "wait please" : "search for article"}
          </button>
        </form>
      </div>
    </header>
  );
};

export default Header;
