import axios from 'axios';

export const baseUrl = 'https://bayut.p.rapidapi.com';

export const fetchApi = async (url:string) => {
  const response = await axios.get(url, {
    headers: {
      'X-RapidAPI-Host': 'bayut.p.rapidapi.com',
      'X-RapidAPI-Key': '711403b2f2mshf16d4e5eaa55308p1fac40jsnbb84ed2068f6',
    },
  });
  return response.data
};
