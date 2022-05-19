import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "https://real-tube.herokuapp.com/api/video";

const getAllVideos = () => {
    return axios.get(API_URL, {headers: authHeader()})    
}

const getVideo = (id) => {
    return axios.get(API_URL+'/'+id, {headers: authHeader()})    
}

const Videos = {
    getAllVideos,
    getVideo
}

export default Videos;