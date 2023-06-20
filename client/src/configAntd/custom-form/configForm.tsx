import { Rule } from 'antd/es/form'
import { NamedExoticComponent, ReactNode } from 'react'
import { addFlower } from '../../api/product/flower'
import { IInputProduct, IngredientInput } from '../../interface/product'
import { addBouquet } from '../../api/product/bouquet'
import { AxiosResponse } from 'axios'
import { ParentIngredientInput } from './parents-cusInput'

export type TypeForm = 'bouquet' | 'flower' | 'accessory'
export type AtrInput = {
   label: string | ReactNode
   className: string
   name: string
   rules: Rule[]
}
export type PropsCusInput = {
   getValue?: (values: any, name: string) => void
   defaultValue?: any
}
type ConfigFormInput = {
   name: TypeForm
   inputs: {
      label: string | ReactNode
      className: string
      name: string
      rules: Rule[]
      cusInput?: NamedExoticComponent<PropsCusInput>
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
         cusInput: ParentIngredientInput
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
