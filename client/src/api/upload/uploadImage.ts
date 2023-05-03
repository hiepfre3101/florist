import { UploadFile } from 'antd'
import instance from '../config'

export const uploadImage = (userId: string, files: UploadFile[], ctr?: AbortController | undefined) => {
   const formData = new FormData()
   for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i].originFileObj as Blob)
   }
   return instance.post(`/upload/${userId}`, formData, {
      headers: {
         'Content-Type': 'multipart/formdata'
      },
      validateStatus: (status: number) => {
         return status < 500
      },
      signal: ctr?.signal
   })
}
