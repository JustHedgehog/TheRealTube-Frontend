import api from "./api"
import TokenService from "./token.service";


const uploadAvatar = (avatar) => {
    const user = TokenService.getUser();
    const formData = new FormData();
    formData.append('file', avatar);
    const headers = {
       'content-type': 'multipart/form-data',
       'Authorization': 'Bearer ' + user.accessToken
  }

    return api.post(`/user/avatar/${user.id}`,formData, {headers: headers }); 
}

const UserService = {
    uploadAvatar,
  };

export default UserService;  