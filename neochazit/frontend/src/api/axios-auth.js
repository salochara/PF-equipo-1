import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://0.0.0.0:80',
    headers: {
        'Authorization': {
            toString() {
                return `Bearer ${localStorage.getItem('token')}`
            }
        }
    }
});

export default instance