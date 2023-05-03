import { UploadFile } from 'antd'

export interface IHero {
   id?: string
   name: string
   title: string
   desc: string
   image: string
}

export interface IInputHero {
   name: string
   title: string
   desc: string
   image: UploadFile[]
}
