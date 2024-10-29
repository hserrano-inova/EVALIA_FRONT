// src/plugins/axios.js
import axios from 'axios';
import AuthService from '@/authreq/auth';
// import { useLanguage } from '@/composables/useLanguage';

const instance = axios.create({
  baseURL: import.meta.env.VITE_APP_DOMAIN + import.meta.env.VITE_APP_APIPATH,
});


instance.interceptors.request.use(
  (config) => {
    const user = AuthService.getCurrentToken();

    if (user && user.access_token) {
      // config.headers['Content-Type'] = 'application/json',
      config.headers['accept'] = 'application/json',
      config.headers['Authorization'] = 'Bearer ' + user.access_token
      config.headers["accept-language"] = localStorage.getItem('language') || 'es'
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// instance.interceptors.response.use(
//   (res) => res,
//   async (err) => {
//     const originalConfig = err.config;

//     if (err.response.status === 401 && !originalConfig._retry) {
//       originalConfig._retry = true;

//       try {
//         const rs = await instance.post('/refresh-token', {
//           refreshToken: AuthService.getCurrentToken().refreshToken,
//         });

//         const { access_token } = rs.data;
//         AuthService.updateToken(access_token);

//         return instance(originalConfig);
//       } catch (_error) {
//         AuthService.logout();
//         // Redirigir al login o mostrar mensaje
//         return Promise.reject(_error);
//       }
//     }

//     return Promise.reject(err);
//   }
// );

export default instance;

