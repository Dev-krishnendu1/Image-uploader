import './App.css'
import UploadImage from './Components/UploadImage'
function App() {
  return (
    <center>
    <div className="card m-3" style={{ maxWidth: "600px" }}>
      <div className="card-body">
   <h1>Image Uploader in Database</h1>
     <UploadImage/>
   </div>
   </div>
   </center>

  )
}

export default App
