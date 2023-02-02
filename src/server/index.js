import { instance as axios } from '../utils/axios';

export const trendingWeek = async (params = null) => {
  const itens = await axios.get('/trending/all/week', {
    params: {
      page: params?.page || 1,
    },
  });
  return itens;
};

export const details = async (params = null) => {
  if (!params?.itemId || !params.type) return null;
  const { itemId, type } = params;
  const details = await axios.get(`/${type}/${itemId}`);
  return details;
};
