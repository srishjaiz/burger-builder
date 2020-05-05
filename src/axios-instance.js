import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-f7d7c.firebaseio.com/'
});

export default instance;