import { IInputSignin, IInputSignup } from '../../interface/user'
import instance from '../config'

export const signup = (data: IInputSignup) => {
   return instance.post('/signup', data, { withCredentials: true })
}
export const signin = (data: IInputSignin) => {
   return instance.post('/signin', data, { withCredentials: true })
}
