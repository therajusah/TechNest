import  { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v2/admin/gallery");
      setImages(response.data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <h1 className="flex justify-center my-4 text-2xl font-bold">Our past Events</h1>
        <div className="grid grid-cols-1 gap-4">
          {images.map((image, index) => (
            <div
              key={image._id}
              className={`flex items-center justify-between overflow-hidden rounded-lg shadow-lg ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
            >
              <div className="w-1/2">
                <img
                  src={image.imageUrl}
                  alt={image.title}
                  className="object-cover w-full h-full rounded-l-lg"
                />
              </div>
              <div className="w-1/2 p-4">
                <p className="text-lg font-semibold">{image.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
