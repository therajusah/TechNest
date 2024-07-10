import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ManageGallery = () => {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState({
    id: '',
    imageUrl: '',
    title: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const formRef = useRef(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/v2/admin/gallery')
      .then(response => {
        setImages(response.data);
      })
      .catch(error => {
        console.error('Error fetching images:', error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentImage({ ...currentImage, [name]: value });
  };

  const handleAddImage = () => {
    axios.post('http://localhost:5000/api/v2/admin/gallery', currentImage)
      .then(response => {
        setImages([...images, response.data]);
        setShowForm(false);
        setCurrentImage({ id: '', imageUrl: '', title: '' });
        toast.success('Image added successfully!');
      })
      .catch(error => {
        console.error('Error adding image:', error);
        toast.error('Failed to add image.');
      });
  };

  const handleUpdateImage = (id) => {
    axios.put(`http://localhost:5000/api/v2/admin/gallery/${id}`, currentImage)
      .then(response => {
        setImages(images.map(image => (image._id === id ? response.data : image)));
        setIsEditing(false);
        setShowForm(false);
        setCurrentImage({ id: '', imageUrl: '', title: '' });
        toast.success('Image updated successfully!');
      })
      .catch(error => {
        console.error('Error updating image:', error);
        toast.error('Failed to update image.');
      });
  };

  const handleDeleteImage = (id) => {
    axios.delete(`http://localhost:5000/api/v2/admin/gallery/${id}`)
      .then(() => {
        setImages(images.filter(image => image._id !== id));
        toast.success('Image deleted successfully!');
      })
      .catch(error => {
        console.error('Error deleting image:', error);
        toast.error('Failed to delete image.');
      });
  };

  const scrollFormIntoView = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Manage Gallery</h1>

      <button
        onClick={() => {
          setShowForm(!showForm);
          if (!showForm) scrollFormIntoView();
        }}
        className="px-4 py-2 mb-4 text-white bg-blue-500 rounded"
      >
        {showForm ? 'Close Form' : 'Add Image'}
      </button>

      {showForm && (
        <div ref={formRef} className="p-4 mb-6 bg-white rounded shadow">
          <h2 className="mb-4 text-xl">{isEditing ? 'Edit Image' : 'Add New Image'}</h2>
          <input
            type="text"
            name="imageUrl"
            placeholder="Image URL"
            value={currentImage.imageUrl}
            onChange={handleInputChange}
            className="w-full p-2 mb-2 border"
          />
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={currentImage.title}
            onChange={handleInputChange}
            className="w-full p-2 mb-2 border"
          />
          {isEditing ? (
            <button
              onClick={() => handleUpdateImage(currentImage._id)}
              className="px-4 py-2 text-white bg-green-500 rounded"
            >
              Update Image
            </button>
          ) : (
            <button
              onClick={handleAddImage}
              className="px-4 py-2 text-white bg-blue-500 rounded"
            >
              Add Image
            </button>
          )}
        </div>
      )}

      <ul className="space-y-4">
        {images.map(image => (
          <li key={image._id} className="flex items-center justify-between p-4 bg-white rounded shadow">
            <div>
              <h2 className="mb-2 text-lg font-bold">{image.title}</h2>
              <img src={image.imageUrl} alt={image.title} className="w-24 h-24" />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setCurrentImage(image);
                  setIsEditing(true);
                  setShowForm(true);
                  scrollFormIntoView(); 
                }}
                className="px-4 py-2 text-white bg-yellow-500 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteImage(image._id)}
                className="px-4 py-2 text-white bg-red-500 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageGallery;
