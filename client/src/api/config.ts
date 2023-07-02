import axios from 'axios'
import { store } from '../store/store'
import { message } from 'antd'

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

instance.interceptors.response.use(
   (value) => {
      if (value.status === 401) {
         message.error('Login again please!')
      }
      return value
   },
   (err) => {
      message.error('Something wrong!')
      location.assign('/error')
      return Promise.reject(err)
   }
)
export default instance
