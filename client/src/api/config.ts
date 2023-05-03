import axios from 'axios'

const instance = axios.create({
   baseURL: 'http://localhost:5353/api',
   headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type'
   }
})

instance.interceptors.request.use(function (config) {
   config.withCredentials = true
   return config
})
export default instance
