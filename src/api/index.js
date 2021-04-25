import axios from '../axios';

export default {
  getSideList(type) {
    return axios.get('/getsidebar', {
      params: {
        type,
      },
    });
  },
  getGoodsList({
    type, page, size, sort,
  }) {
    return axios.get('/getGoodsList', {
      params: {
        type,
        page,
        size,
        sort,
      },
    });
  },
  likeSearch(value) {
    return axios.get('/likeSearch', { params: { likeValue: value } });
  },
  search(value, page, size) {
    return axios.get('/search', { params: { type: value, page, size } });
  },
  getGoodsByIds(value) {
    return axios.get('/getGoodsByIds', { params: { value } });
  },
};
