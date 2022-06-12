import api from "./api"
import TokenService from "./token.service";
// const API_URL = "https://real-tube.herokuapp.com/api/video";



const getAllVideos = () => {
    return api.get('/video')
}

const getVideosByUser = () => {
    const user = TokenService.getUser()
    return api.get('/video/' + user.id + '/video')
}

const getVideo = (id) => {
    return api.get('/video/' + id)
}

const deleteVideo = (id) => {
    return api.delete('/video/' + id)
}

const getVideosByTitle = (title) => {
    return api.get('/video/name/' + title)
}

const uploadVideo = (file, name, description) => {
    const user = TokenService.getUser()
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('description', description)
    const headers = {
        'content-type': 'multipart/form-data',
        'Authorization': 'Bearer ' + user.accessToken
    }

    return api.post(`/video/upload/${user.id}`, formData, { headers: headers });
}

const getVideosLikes = (id) => {
    return api.get('/video/likes/' + id)
}

const setVideoLikes = (videoId, like) => {
    const userId = TokenService.getUser().id;
    return api.post(`/video/judge/${videoId}`, {}, {
        params: {
            userId,
            videoId,
            like
        }
    })
        .then(response => response.status)
        .catch(err => console.warn(err));
}

const Videos = {
    getAllVideos,
    getVideo,
    getVideosByUser,
    getVideosByTitle,
    uploadVideo,
    deleteVideo,
    getVideosLikes,
    setVideoLikes
}

export default Videos;