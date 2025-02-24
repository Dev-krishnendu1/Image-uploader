import { useState, useEffect } from "react";
import axios from "axios";
import "./UploadImage.css"
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
      <h4 className="Iheader">Uploading Images</h4>
      <input type="file" className="input-container" onChange={handleImageChange} />
      <button className="button"onClick={handleUpload}>Upload</button>

      <h2 className="gallary-box">Gallery</h2>
      {imageList.map((img, index) => (
        <img key={index} src={img.imageUrl}
         alt="Uploaded"
        style={{ width: "200px", margin: "10px" }} />
      ))}
    </div>
  );
};

export default ImageUpload;
