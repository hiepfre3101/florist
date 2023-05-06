import axios from 'axios'
import { store } from '../store/store'

const instance = axios.create({
   baseURL: 'http://localhost:5353/api',
   headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type'
   },
   withCredentials: true
})

instance.interceptors.request.use((config) => {
   const { auth } = store.getState()
   const token = auth.token
   if (token !== '') {
      config.headers.Authorization = `Bearer ${token}`
   }
   return config
})
export default instance
