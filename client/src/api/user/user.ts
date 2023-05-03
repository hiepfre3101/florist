import instance from '../config'
import { IUser } from '../../interface/user'

export const getUsers = () => {
   return instance.get(`/users`)
}
export const getUser = (userId: string) => {
   return instance.get(`/users/${userId}`)
}
