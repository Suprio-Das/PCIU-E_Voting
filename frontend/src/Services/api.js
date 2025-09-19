import axios from 'axios'


const PC1_IP = 'localhost'


const api = axios.create({
    baseURL: `http://${PC1_IP}:3000/api`,
    withCredentials: true
})


export default api