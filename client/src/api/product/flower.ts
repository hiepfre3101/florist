import instance from '../config'
import { IInputProduct } from '../../interface/product'

export type IQuery = {
   limit?: number
   sort?: string
   order?: 'asc' | 'desc'
   page?: number
}
export const getAllFlower = ({ limit, sort, order, page }: IQuery) => {
   return instance.get(`/flower`, {
      params: {
         _limit: limit,
         _sort: sort,
         _order: order,
         _page: page
      },
      withCredentials: true
   })
}

export const getOneFlower = (id: string | undefined) => {
   return instance.get(`/flower/${id}`)
}

export const deleteFlower = (id: string | undefined) => {
   return instance.delete(`/flower/${id}`)
}

export const updateFlower = (id: string | undefined, data: IInputProduct) => {
   return instance.put(`/flower/${id}`, data)
}

export const addFlower = (data: IInputProduct) => {
   return instance.post('/flower', data)
}
