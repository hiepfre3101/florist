import instance from '../config'
import { IInputProduct } from '../../interface/product'

type IQuery = {
   limit?: number
   sort?: string
   order?: 'asc' | 'desc'
   page?: number
}
export const getAllBouquet = ({ limit, sort, order, page }: IQuery) => {
   return instance.get(`/bouquet`, {
      params: {
         _limit: limit,
         _sort: sort,
         _order: order,
         _page: page
      },
      withCredentials: true
   })
}

export const getOneBouquet = (id: string | undefined) => {
   return instance.get(`/bouquet/${id}`)
}

export const deleteBouquet = (id: string | undefined) => {
   return instance.delete(`/bouquet/${id}`)
}

export const updateBouquet = (id: string | undefined, data: IInputProduct) => {
   return instance.put(`/bouquet/${id}`, data)
}

export const addBouquet = (data: IInputProduct) => {
   return instance.post('/bouquet', data)
}
