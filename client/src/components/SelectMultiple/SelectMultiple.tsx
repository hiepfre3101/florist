import { InputNumber, Select, message } from 'antd'
import { AxiosResponse } from 'axios'
import { useEffect, useState, memo, useCallback } from 'react'
import { IQuery } from '../../api/product/flower'
import ListItem from '../List/ListItem'

type Props<T> = {
   apiHandler: (params?: any) => Promise<AxiosResponse<any, any>>
   defaultData?: []
   placeholder: string
   name: string
   getValues?: (values: any[], name: string) => void
}

const SelectMultiple = <T,>({ apiHandler, placeholder, getValues, name, defaultData }: Props<T>) => {
   const [data, setData] = useState<any[]>([])
   const [selectValue, setSelectValue] = useState<any>()
   const [inputValue, setInputValue] = useState<any>()
   const [values, setValues] = useState<any>([])
   const [addedList, setAddedList] = useState<any[]>(defaultData && defaultData.length > 0 ? defaultData : [])
   useEffect(() => {
      ;(async () => {
         try {
            const res = await apiHandler()
            setData(res.data.data.docs)
         } catch (error) {
            message.error('Something wrong !')
            console.log(error)
         }
      })()
   }, [])
   const handleAddField = (selectedValue: string) => {
      const dataReturn = [...values, { selectValue, inputValue }]
      if (getValues && inputValue !== '' && selectValue !== '') {
         setValues([...values, { selectValue, inputValue }])
         getValues(dataReturn, name)
      }
      setAddedList([...addedList, { listData: data.find((item) => item._id === selectedValue), quantity: inputValue }])
      setInputValue('')
      setSelectValue('')
   }
   const handleRemoveItem = useCallback(
      (id: string) => {
         setAddedList([...addedList.filter((item) => item?.listData._id !== id)])
      },
      [addedList]
   )
   return (
      <div className='flex flex-col justify-center w-full'>
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
            <button
               type='button'
               className='p-3 text-white bg-blue-300 rounded-lg'
               onClick={() => handleAddField(selectValue)}
            >
               Add
            </button>
         </div>
         <ListItem data={addedList} onRemove={handleRemoveItem} />
      </div>
   )
}

export default memo(SelectMultiple)
