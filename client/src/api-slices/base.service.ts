import { BaseQueryFn, createApi } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store/store'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { notification } from 'antd'
import { authSlice } from '../slices/authSlice'
import { clearToken } from '../api/auth/auth'
const customBaseQuery =
   ({
      baseUrl
   }: {
      baseUrl: string
   }): BaseQueryFn<
      {
         url: string
         method: AxiosRequestConfig['method']
         data?: AxiosRequestConfig['data']
         params?: AxiosRequestConfig['params']
      },
      unknown,
      unknown
   > =>
   async ({ url, method, params, data }, { getState, dispatch }) => {
      try {
         const {
            auth: { token }
         } = getState() as RootState
         const headers = {
            Authorization: `Bearer ${token}`
         }
         const result = await axios({ url: baseUrl + url, method, data, params, headers, withCredentials: true })
         return { data: result.data }
      } catch (error) {
         let err = error as AxiosError<{ data?: any[]; message?: string; isExpired?: boolean }>
         if (err.response?.data?.message) {
            notification.open({
               message: err.response?.data?.message
            })
            await clearToken()
            dispatch(authSlice.actions.login(false))
            dispatch(authSlice.actions.token(''))
         }
         return {
            error: {
               status: err.response?.status,
               data: err.response?.data || err.message
            }
         }
      }
   }

export const hoaApi = createApi({
   reducerPath: 'hoaApi',
   baseQuery: customBaseQuery({ baseUrl: 'http://localhost:5353/api/' }),
   tagTypes: ['Cart'],
   //endpoints: methods like get,post,put, delete...
   endpoints: () => ({})
})
