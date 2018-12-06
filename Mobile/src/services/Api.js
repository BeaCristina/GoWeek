import axios from 'axios';
/*genymotion : 10.0.3.2
 androidStudio: 10.0.2.2*/
const api = axios.create({
    baseURL: 'http://10.0.3.2:8080'
});

export default api;