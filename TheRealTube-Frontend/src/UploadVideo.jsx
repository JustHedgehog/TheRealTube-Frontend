import React, { useState } from 'react';
import Navbar from './components/navbar';
import Videos from './services/video.service';
import "./UploadVideo.css";

export default function UploadVideo() {
  const [file, setFile] = useState()
  const [title, setTitle] = useState()
  const [message, setMessage] = useState()
  const [success, setSuccess] = useState(false)

  function handleChangeTitle(event) {
    setTitle(event.target.value)
  }

  function getExtension(filename) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
  }

  function isVideo(filename) {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
      case 'm4v':
      case 'avi':
      case 'mpg':
      case 'mp4':
      case 'webm':
      case 'avchd':
      case 'flv':
      case 'mkv':
      case 'mov':
      case 'wmv':
      case 'mpeg':
      case '3gpp':  
        // etc
        return true;
    }
    return false;
  }

  function handleChange(event) {
    setFile(event.target.files[0])
    if (!event.target.files[0]) {
      setMessage("");
    }
    else if (!isVideo(event.target.files[0].name)) {
      setMessage("Zły format pliku! Załaduj plik z formatem video!");
    } else {
      setMessage("");
    }

  }


  function handleSubmit(event) {
    event.preventDefault()

    if (isVideo(file.name)) {
      Videos.uploadVideo(file, title).then(
        () => {
          setSuccess(true);
        },
        (error) => {
          var resMessage = error.response.data;
          setMessage(resMessage);
        }
      );
    } else {
      setMessage("Zły format pliku! Załaduj plik z formatem video!");
    }

  }

  const uploadForms = (
    <form onSubmit={handleSubmit} className="uploadForm">
      <h1 className='h1Upload'>Prześlij film</h1>
      <div className="innerUploadForm">
        <div className="input-container-upload">
          <input type="text" onChange={handleChangeTitle} required />
          <span></span>
          <label >Tytuł filmu</label>
        </div >
        <div style={{ marginBottom: '20px' }} >
          <input type="file" onChange={handleChange} accept="video/*" required className="choose" />
        </div>
        <div className='errorUpload'>{message}</div>
        <button type="submit" className='submitUpload'>Prześlij</button>
      </div>
    </form>
  );

  const succcessInfo=(
    <div className='success' ><h2 className='h2Upload'>Przesłano pomyślnie wideo</h2><div style={{ textAlign:'center'}} >
      <button onClick={()=>{window.location.href=`/`}} className='submitUpload' style={{ width:'150px'}}>Powrót</button></div></div>
  );


  return (
    <div >
      <Navbar></Navbar>
      <div style={{ paddingTop: '100px' }} className="uploadApp">
          {success? succcessInfo: uploadForms}
      </div>
    </div>
  );
}
