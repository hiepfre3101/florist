import { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { IQuery } from '../api/product/flower'
import { TypeForm } from '../configAntd/custom-form/configForm'

interface IProps {
   getList: ({}: IQuery, type: TypeForm) => Promise<AxiosResponse<any, any>>
   options?: Partial<IQuery>
   type: TypeForm
}
const useListItem = <T>({ getList, options, type }: IProps) => {
   const [data, setData] = useState<T>([] as T)
   const [loading, setLoading] = useState<boolean>(true)
   useEffect(() => {
      ;(async () => {
         try {
            setLoading(true)
            const { data } = await getList({ ...options }, type)
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
