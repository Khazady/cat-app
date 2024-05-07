import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import CatGallery from "./components/cat-gallery/cat-gallery";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

function ImageWindow() {
  const [isCalled, setIsCalled] = useState(false);

  useEffect(() => {
    window.context.changeImage(() => setIsCalled(true));
  }, []);

  const handleChange = () => setIsCalled(false)

  return (
    <main>
      <CatGallery isCalled={isCalled} handleChange={handleChange} />
    </main>
  );
}

root.render(
  <React.StrictMode>
    <ImageWindow />
  </React.StrictMode>,
);
