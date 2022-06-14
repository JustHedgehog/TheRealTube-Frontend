import api from "./api"
import TokenService from "./token.service";

const getCommentsByVideo = (videoId) => {
    return api.get(`/comment/video/${videoId}`)
}

const uploadComment = (videoId, comment) => {
    const user = TokenService.getUser()
    const formData = new FormData();
    formData.append('description', comment)
    const headers = {
        'Authorization': 'Bearer ' + user.accessToken
    }
    return api.post(`/comment/${videoId}/${user.id}`, formData, { headers: headers });
}

const Comments = {
    getCommentsByVideo,
    uploadComment
}

export default Comments;