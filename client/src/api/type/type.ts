import instance from '../config'

export const getAllType = () => {
   return instance.get('/types')
}
