import './App.css'
import UploadImage from './Components/UploadImage'
function App() {
  return (
    <center>
    <div className="card m-5" style={{ maxWidth: "600px" }}>
      <div className="card-body">
   <h3 className='header'>Image <span>Uploader</span></h3>
     <UploadImage/>
   </div>
   </div>
   </center>

  )
}

export default App
