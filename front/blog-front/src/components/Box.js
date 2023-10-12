import { Button } from "antd";
import { useState } from "react";

const Box = ({ children }) => {
  const [show, setShow] = useState(true);

  const handleClick = () => {
    setShow((show) => !show);
  };
  return (
    <div className="p-5 h-screen">
      <div className="flex justify-between">
        <div className="text-white"></div>
        <Button
          type="primary"
          ghost={true}
          className="mt-3 mb-3"
          onClick={handleClick}
          style={{ color: "white", backgroundColor: "#339af0" }}
        >
          {show ? "Hide" : "Show"}
        </Button>
      </div>
      <div
        className="relative"
        style={{ overflowY: "auto", height: "700px", overflowX: "hidden" }}
      >
        {show && children}
      </div>
    </div>
  );
};

export default Box;
