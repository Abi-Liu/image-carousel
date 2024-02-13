import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [images, setImages] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await fetch(
          "https://api.unsplash.com/photos?client_id=X-alkoTrLHFwiYd_GcbW9Qwyk8AgD8TusakyyoDLVig&per_page=25"
        );
        const data = await res.json();
        setImages(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchImages();
  }, []);

  useEffect(() => {
    if (images) {
      setCurrentImage(images[0].urls.small);
    }
  }, [images]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (images) {
        setIndex((prev) => {
          const newIndex = prev < images.length - 1 ? prev + 1 : 0;
          setCurrentImage(images[newIndex].urls.small);
          return newIndex;
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  function nextImage() {
    setCurrentImage(images[index + 1].urls.small);
    setIndex((prev) => prev + 1);
  }

  function previousImage() {
    setCurrentImage(images[index - 1].urls.small);
    setIndex((prev) => prev - 1);
  }

  return (
    <div className="App">
      <div className="wrapper">
        <button
          className="button-previous"
          onClick={previousImage}
          disabled={index === 0}
        >
          {"<"}
        </button>
        <img src={currentImage} alt="" />
        <button
          className="button-next"
          onClick={nextImage}
          disabled={images ? images.length === index : false}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}
