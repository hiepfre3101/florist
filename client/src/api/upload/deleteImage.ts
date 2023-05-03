import instance from '../config'

export const deleteImage = (publicId: string, imageIdMongo: string, ctr?: AbortController | undefined) => {
   return instance.delete(`/delete-image/${publicId}?imgId=${imageIdMongo}`, { signal: ctr?.signal })
}
