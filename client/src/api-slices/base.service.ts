import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const hoaApi = createApi({
   reducerPath: 'hoaApi',
   baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5353/api/' }),
   tagTypes: ['Cart'],
   //endpoints: methods like get,post,put, delete...
   endpoints: () => ({})
})