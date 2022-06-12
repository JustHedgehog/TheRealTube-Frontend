import api from "./api"
import TokenService from "./token.service";

const getAllVideos = () => {
    return api.get('/video')    
}

const getVideosByUser = () => {
    const user = TokenService.getUser()
    return api.get('/video/'+user.id +'/video')    
}

const getVideo = (id) => {
    return api.get('/video/'+id)    
}

const deleteVideo = (id) => {
    return api.delete('/video/'+id)    
}

const getVideosByTitle = (title) => {
    return api.get('/video/name/'+title)    
}

const uploadVideo = (file, name, description) => {
    const user = TokenService.getUser()
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('description',description)
    const headers = {
       'content-type': 'multipart/form-data',
       'Authorization': 'Bearer ' + user.accessToken
  }

    return api.post(`/video/upload/${user.id}`,formData, {headers: headers }); 
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