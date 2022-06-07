import React, { useState, useEffect } from 'react';
import Navbar from './components/navbar';
import UserService from './services/user.service';
import "./Avatar.css";
import TokenService from './services/token.service';

export default function Avatar() {
  const [file, setFile] = useState()
  const [message, setMessage] = useState()
  const [success, setSuccess] = useState(false)

  const user = TokenService.getUser();
  
  useEffect(()=>{
    if(!user){
        window.location.href='/';
    }
  });


  function getExtension(filename) {
    var parts = filename.split('.');
    return parts[parts.length - 1];
  }

  function isImage(filename) {
    var ext = getExtension(filename);
    switch (ext.toLowerCase()) {
      case 'jpg':
      case 'jpeg':
      case 'svg':
      case 'bmp':
      case 'png':
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
    else if (!isImage(event.target.files[0].name)) {
      setMessage("Zły format pliku! Załaduj plik z formatem graficznym!");
    } else {
      setMessage("");
    }

  }


  function handleSubmit(event) {
    event.preventDefault()

    if (isImage(file.name)) {
      UserService.uploadAvatar(file).then(
        () => {
          setSuccess(true);
        },
        (error) => {
          var resMessage = error.response.data;
          setMessage(resMessage);
        }
      );
    } else {
      setMessage("Zły format pliku! Załaduj plik z formatem graficznym!");
    }

  }

  const uploadForms = (
    <form onSubmit={handleSubmit} className="uploadFormAvatar">
      <h1 className='h1UploadAvatar'>Ustaw avatar</h1>
      <div className="innerUploadFormAvatar">
        <div style={{ marginBottom: '20px' }} >
          <input type="file" onChange={handleChange} accept="image/*" required className="chooseAvatar" />
        </div>
        <div className='errorUploadAvatar'>{message}</div>
        <button type="submit" className='submitUploadAvatar'>Ustaw</button>
      </div>
    </form>
  );

  const succcessInfo=(
    <div className='success' ><h2 className='h2UploadAvatar'>Ustawiono pomyślnie avatar</h2><div style={{ textAlign:'center'}} >
      <button onClick={()=>{window.location.href=`/`}} className='submitUploadAvatar' style={{ width:'150px'}}>Powrót</button></div></div>
  );


  return (
    <div >
      <Navbar></Navbar>
      <div style={{ paddingTop: '100px' }} className="uploadAppAvatar">
          {success ? succcessInfo : uploadForms}
      </div>
    </div>
  );
}
