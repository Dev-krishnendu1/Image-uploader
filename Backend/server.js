//mongodb+srv://krishnendumaity2110:bopJ0KapTPT94Iy8@cluster0.jxxop.mongodb.net/Images

const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
// Connect to MongoDB
mongoose.connect("mongodb+srv://krishnendumaity2110:bopJ0KapTPT94Iy8@cluster0.jxxop.mongodb.net/Images")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error(err));

// Define Schema & Model
const imageSchema = new mongoose.Schema({
  imageUrl: String,
});
const Image = mongoose.model("Image", imageSchema);

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Upload Image API
app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const newImage = new Image({ imageUrl: `http://localhost:5051/uploads/${req.file.filename}` });
    await newImage.save();
    res.json({ success: true, imageUrl: newImage.imageUrl });
  } catch (err) {
    res.status(500).json({ success: false, message: "Upload failed" });
  }
});

// Fetch Images API
app.get("/images", async (req, res) => {
  const images = await Image.find();
  res.json(images);
});

// Start Server
const PORT = 5051;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
