import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.VUE_APP_APIPATH}`,
  headers: {
    Authorization: `Bearer ${process.env.VUE_APP_APITOKEN}`,
  },
});

export default api;
