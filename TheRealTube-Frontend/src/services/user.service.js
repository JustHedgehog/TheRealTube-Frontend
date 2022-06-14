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

  return api.post(`/user/avatar/${user.id}`, formData, { headers: headers });
}
const getUsers = () => {
  return api.get(`/user`);
}

const deleteUser = (id) => {
  return api.delete(`/user/` + id);
}

const UserService = {
  uploadAvatar,
  getUsers,
  deleteUser
};



export default UserService;  