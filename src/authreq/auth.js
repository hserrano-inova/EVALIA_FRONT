//Aporta las funciones de login, logout y guarda y elimina el token
import axios from 'axios';

const API_URL = import.meta.env.VITE_APP_DOMAIN + import.meta.env.VITE_APP_APIPATH;

class AuthService {
  async login(username, password) {
    const response = await axios.post(API_URL + '/token', 
      {username,password},
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}
    ).catch((error) => {
      throw error.response
    })
    if (response.data.access_token) {
      localStorage.setItem('evalia_token', JSON.stringify(response.data));
    }
    return response.data;
  }

  logout() {
    localStorage.removeItem('evalia_token');
  }

  getCurrentToken() {
    return JSON.parse(localStorage.getItem('evalia_token'));
  }
}

export default new AuthService();