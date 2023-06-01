import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store/store'

export const hoaApi = createApi({
   reducerPath: 'hoaApi',
   baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:5353/api/',
      prepareHeaders(headers, { getState }) {
         const {
            auth: { token }
         } = getState() as RootState
         if (token !== '') {
            headers.set('Authorization', `Bearer ${token}`)
         }
         return headers
      },
   }),
   tagTypes: ['Cart'],
   //endpoints: methods like get,post,put, delete...
   endpoints: () => ({})
})
