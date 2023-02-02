import axios from 'axios';
import { API_KEY } from '@env';

export const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: API_KEY,
    include_image_language: 'en',
    language: 'pt-BR',
  },
  method: 'post',
});
