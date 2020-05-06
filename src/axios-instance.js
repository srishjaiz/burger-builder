import Axios from 'axios';

const instance = Axios.create({
    baseURL: 'https://burger-builder-f7d7c.firebaseio.com/'
});
instance.interceptors.request.use(req => {
    // console.log('req: ',req)
    return req;
}, err =>{
    return Promise.reject(err);
})
instance.interceptors.response.use(res => {
    // console.log('res: ', res);
    return res;
}, err =>{
    return Promise.reject(err);
})


export default instance;