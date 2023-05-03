import React, { useState } from 'react'
import { uploadImage } from '../api/upload/uploadImage'
import axios from 'axios'
import ButtonUpLoad from '../components/ButtonUpLoad/ButtonUpLoad'
import { Form, Input, Select, UploadFile, message, Button } from 'antd'
type Props = {}

const Test = (props: Props) => {
   const [files, setFiles] = useState<any>([])
   const [form] = Form.useForm()
   const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo)
   }
   const onFinish = (values: any) => {
      console.log('Data:', values)
   }
   const handleSubmit = async (e: any) => {}
   return (
      <div>
         <Form
            form={form}
            name='image'
            size='large'
            className='w-[30%] min-h-[500px] pr-3 overflow-hidden  relative border-r-[1px] border-gray-200'
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
            encType='multipart/form-data'
         >
            <Form.Item
               validateTrigger={'onChange'}
               className='w-full'
               name='images'
               rules={[{ required: true, message: 'Please select your image!' }]}
            >
               <ButtonUpLoad form={form} className='absolute left-5 top-5 pr-3 ' />
            </Form.Item>
            <Form.Item className='absolute bottom-10 left-[40%] translate-x-[-50%]'>
               <Button
                  htmlType='submit'
                  className='ml-10 py-1 px-5 duration-500 font-semibold border rounded-md border-primary hover:bg-primary hover:text-white'
               >
                  Save
               </Button>
            </Form.Item>
         </Form>
      </div>
   )
}

export default Test
