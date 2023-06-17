import { InputNumber, Select, message } from 'antd'
import { AxiosResponse } from 'axios'
import { useEffect, useState, memo } from 'react'
import { IQuery } from '../../api/product/flower'

type Props = {
   apiHandler: (params?: any) => Promise<AxiosResponse<any, any>>
   paramsApi?: IQuery
   placeholder: string
   name: string
   getValues?: (values: any[], name: string) => void
}

const SelectMultiple = ({ apiHandler, placeholder, paramsApi, getValues, name }: Props) => {
   const [data, setData] = useState<any>([])
   const [selectValue, setSelectValue] = useState<any>()
   const [inputValue, setInputValue] = useState<any>()
   const [values, setValues] = useState<any>([])
   useEffect(() => {
      ;(async () => {
         try {
            const res = await apiHandler(paramsApi)
            setData(res.data.data.docs)
         } catch (error) {
            message.error('Something wrong !')
            console.log(error)
         }
      })()
   }, [])
   const handleAddField = () => {
      const dataReturn = [...values, { selectValue, inputValue }]
      if (getValues && inputValue !== '' && selectValue !== '') {
         setValues([...values, { selectValue, inputValue }])
         getValues(dataReturn, name)
      }
      setInputValue('')
      setSelectValue('')
   }
   return (
      <div className='flex justify-start gap-3 items-center'>
         <Select
            value={selectValue}
            className='w-full'
            placeholder={placeholder}
            placement='bottomRight'
            onChange={(value) => setSelectValue(value)}
         >
            {data.map((item: any, index: number) => (
               <Select.Option value={item?._id} label={item?.name} key={index}>
                  {item?.name}
               </Select.Option>
            ))}
         </Select>
         <label>Quantity:</label>
         <InputNumber value={inputValue} min='1' onChange={(value) => setInputValue(value)} />
         <button type='button' className='p-3 text-white bg-blue-300 rounded-lg' onClick={handleAddField}>
            Add
         </button>
      </div>
   )
}

export default memo(SelectMultiple)
