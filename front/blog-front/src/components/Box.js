import { Button } from "antd";
import { useState } from "react";

const Box = ({ children, context, setIdSelected }) => {
  const [show, setShow] = useState(true);
  const style = context === "preview" ? "order-1 md:order-2" : "";

  const handleClick = () => {
    setShow((show) => !show);
    if (context === "preview") setIdSelected(null);
  };
  return (
    <div className={"p-5 h-screen " + { style }}>
      <div className="flex justify-between">
        <div className="text-white"></div>
        {context === "preview" ? (
          <Button
            type="primary"
            ghost={true}
            className="mt-3 mb-3"
            onClick={handleClick}
            style={{ color: "white", backgroundColor: "#339af0" }}
          >
            {show ? "Hide" : "Show"}
          </Button>
        ) : null}
      </div>
      <div
        className="relative md:overflow-y-auto"
        style={{ height: "700px", overflowX: "hidden" }}
      >
        {show && children}
      </div>
    </div>
  );
};

export default Box;
