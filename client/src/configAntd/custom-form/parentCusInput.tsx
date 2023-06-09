import React, { useCallback, useMemo } from 'react'
import SelectMultiple from '../../components/SelectMultiple/SelectMultiple'
import { IQuery, getAllFlower } from '../../api/product/flower'
import { PropsCusInput } from './configForm'
import { Form } from 'antd'


export const ParentIngredientInput = React.memo(({ getValue, defaultValue }: PropsCusInput) => {
   const paramsApi: IQuery = { limit: 100, sort: 'createAt', page: 1, order: 'asc' }
   const apiGetFlowers = useCallback(() => getAllFlower(paramsApi), [])
   const tranformDefaultData = useMemo(
      () => defaultValue?.map((item: any) => ({ itemAdded: item.flower, quantity: item.quantity })),
      [defaultValue]
   )
   return (
      <Form.Item
         hasFeedback
         label={'Ingredients'}
         className='w-full'
         rules={[{ required: true, message: 'Please add ingredients!' }]}
         name={'ingredients'}
      >
         <SelectMultiple
            name='ingredients'
            getValues={(values, name) => {
               if (getValue) getValue(values, name)
            }}
            apiHandler={apiGetFlowers}
            placeholder='Choose Ingredients'
            defaultData={tranformDefaultData}
         />
      </Form.Item>
   )
})
