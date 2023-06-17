import { Rule } from 'antd/es/form'
import { ReactNode } from 'react'
import SelectMultiple from '../components/SelectMultiple/SelectMultiple'
import { addFlower, getAllFlower } from '../api/product/flower'
import { IInputProduct, IProduct, IngredientInput } from '../interface/product'
import { addBouquet } from '../api/product/bouquet'
import { AxiosResponse } from 'axios'

export type TypeForm = 'bouquet' | 'flower' | 'accessory'
export type AtrInput = {
   label: string | ReactNode
   className: string
   name: string
   rules: Rule[]
}
type ConfigFormInput = {
   name: TypeForm
   inputs: {
      label: string | ReactNode
      className: string
      name: string
      rules: Rule[]
      cusInput?: (getValue?: (values: any, name: string) => void) => JSX.Element
   }[]
   onFinishAdd: (values: IInputProduct) => Promise<AxiosResponse<any, any>>
}
const onFinishBouquet = (values: IInputProduct) => {
   const tranformIngredients: IngredientInput[] = values.ingredients!.map((item) => ({
      flower: item.selectValue!,
      quantity: item.inputValue!
   }))
   const dataSubmit: IInputProduct = { ...values, ingredients: tranformIngredients }
   return addBouquet(dataSubmit)
}
const onFinishFlower = (values: IInputProduct) => {
   return addFlower(values)
}
const onFinishAccessory = (values: IInputProduct) => {
   return addFlower(values)
}
const configBouquet: ConfigFormInput = {
   name: 'bouquet',
   inputs: [
      {
         label: 'Ingredients',
         className: 'w-full',
         name: 'ingredients',
         rules: [{ required: true, message: 'Please add ingredients!' }],
         cusInput: (getValue) => (
            <SelectMultiple
               name='ingredients'
               getValues={(values, name) => {
                  if (getValue) getValue(values, name)
               }}
               apiHandler={getAllFlower}
               placeholder='Choose Ingredients'
               paramsApi={{ limit: 100, sort: 'createAt', page: 1, order: 'asc' }}
            />
         )
      }
   ],
   onFinishAdd: onFinishBouquet
}
const configFlower: ConfigFormInput = {
   name: 'flower',
   inputs: [],
   onFinishAdd: onFinishFlower
}
const configAccessory: ConfigFormInput = {
   name: 'accessory',
   inputs: [
      {
         label: 'Materials',
         className: 'w-full',
         name: 'materials',
         rules: [{ required: true, message: 'Please input materials!' }]
      }
   ],
   onFinishAdd: onFinishAccessory
}
export const configs: ConfigFormInput[] = [configBouquet, configFlower, configAccessory]
