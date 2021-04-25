import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mallapi.duyiedu.com/goods/',
  params: {
    appkey: 'hanhan_1615701134607',
  },
});

instance.interceptors.response.use((res) => res.data);

export default instance;
