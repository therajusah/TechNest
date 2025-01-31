import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Loader from "./Loader";
import { toast } from "react-toastify";
import { useConfig } from '../contexts/useConfig';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { apiUrl } = useConfig();

  const fetchImages = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/v2/admin/gallery`);
      setImages(response.data);
      setLoading(false);
    } catch (error) {
      toast.error("Error fetching images");
      setLoading(false);
    }
  }, [apiUrl]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return (
    <div>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <div className="container mx-auto">
          <h1 className="flex justify-center my-4 text-2xl font-bold">
            Our past Events
          </h1>
          <div className="grid grid-cols-1 gap-4">
            {images.map((image, index) => (
              <div
                key={image._id}
                className={`flex items-center justify-between overflow-hidden rounded-lg shadow-lg ${
                  index % 2 === 0 ? "flex-row-reverse" : ""
                }`}
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
      )}
      <Footer />
    </div>
  );
};

export default Gallery;
