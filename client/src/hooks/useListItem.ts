import { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'

interface IProps {
   getList: ({}: any) => Promise<AxiosResponse<any, any>>
   options?: {}
}
const useListItem = <T>({ getList, options }: IProps) => {
   const [data, setData] = useState<T>([] as T)
   const [loading, setLoading] = useState<boolean>(true)
   useEffect(() => {
      ;(async () => {
         try {
            setLoading(true)
            const { data } = await getList({ ...options })
            if (data.data.docs) {
               setData(data.data.docs)
            } else {
               setData(data.data)
            }
            setLoading(false)
         } catch (error) {
            console.log(error)
         }
      })()
   }, [])

   return { data, loading }
}

export default useListItem
