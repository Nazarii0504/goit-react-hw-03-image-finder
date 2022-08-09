import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '29072277-1b7f4c706efe9cea308cc1160';
export const getImages = async (query, page) => {
  const response = await axios.get(``, {
    params: {
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 12,
      q: query,
      page: page,
      key: API_KEY,
    },
  });
  return response.data.hits;
};
