import React from "react";
import ReactDOM from "react-dom/client";
import Button from "./components/button/button";

const buttonRoot = ReactDOM.createRoot(
  document.getElementById("button-root") as HTMLElement,
);
function ButtonWindow() {
  const clickNextImage = () => {
    window.context.nextImage();
  };

  return (
    <main>
      <Button onClick={clickNextImage}>
        Next Cat Image
      </Button>
    </main>
  );
}

buttonRoot.render(
  <React.StrictMode>
    <ButtonWindow />
  </React.StrictMode>,
);
