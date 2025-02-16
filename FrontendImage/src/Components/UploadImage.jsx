import { useState, useEffect } from "react";
import axios from "axios";

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [imageList, setImageList] = useState([]);
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", image);
  
    try {
      await axios.post("http://localhost:5051/upload", formData);
      alert("Upload Successful!");
      fetchImages(); 
    } catch (error) {
      console.error("Upload failed", error);
    }
  };
  

  const fetchImages = async () => {
    const response = await axios.get("http://localhost:5051/images");
    setImageList(response.data);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div>
      <h2>Upload Image</h2>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload</button>

      <h2>Image Gallery</h2>
      {imageList.map((img, index) => (
        <img key={index} src={img.imageUrl} alt="Uploaded" style={{ width: "200px", margin: "10px" }} />
      ))}
    </div>
  );
};

export default ImageUpload;
