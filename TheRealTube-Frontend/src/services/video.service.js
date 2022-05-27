import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "https://real-tube.herokuapp.com/api/video";
// const API_URL = "http://localhost:8080/api/video";
const getAllVideos = () => {
    return axios.get(API_URL)    
}

const getVideosByUser = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return axios.get(API_URL+'/'+user.id +'/video')    
}

const getVideo = (id) => {
    return axios.get(API_URL+'/'+id)    
}

const deleteVideo = (id) => {
    return axios.delete(API_URL+'/'+id,{headers: authHeader()})    
}

const getVideosByTitle = (title) => {
    return axios.get(API_URL+'/name/'+title)    
}

const uploadVideo = (file, name, description) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('description',description)
    const headers = {
       'content-type': 'multipart/form-data',
       'Authorization': 'Bearer ' + user.accessToken
  }

    return axios.post(API_URL+`/upload/${user.id}`,formData, {headers: headers }); 
}

const Videos = {
    getAllVideos,
    getVideo,
    getVideosByUser,
    getVideosByTitle,
    uploadVideo,
    deleteVideo
}

export default Videos;