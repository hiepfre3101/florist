import { Button, ConfigProvider, Form, Input, Select, InputNumber, message, Radio, RadioChangeEvent } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../hooks/redux/hooks'
import { imageSlice, allPropertiesSelector } from '../../components/Modal/ModalUpload/imageSlice'
import useMyToken from '../../hooks/useMyToken'
import { ICategory } from '../../interface/category'
import { getAllCategory } from '../../api/category/category'
import { addProduct, updateProduct } from '../../api/product/product'
import Loading from '../../components/Loading/Loading'
import { IInputProduct } from '../../interface/product'
import ModalUpload from '../../components/Modal/ModalUpload/ModalUpload'
import { IImage } from '../../interface/image'
import FileImage from '../../components/Modal/ModalUpload/FileImage'
import { getOneProduct } from '../../api/product/product'
import { IUser } from '../../interface/user'
import useTriggerUpload from '../../hooks/useTriggerUpload'
import { getAllType } from '../../api/type/type'
import { ITypeOfProduct } from '../../interface/type'

const onFinishFailed = (errorInfo: any) => {
   console.log('Failed:', errorInfo)
}

const UpdateProduct = () => {
   const { colorPrimary } = useMyToken()
   const { isOpen, setIsOpen, handleCloseModal, handleOnAdd } = useTriggerUpload()
   const [isLoading, setIsLoading] = useState(false)
   const [types, setTypes] = useState<ITypeOfProduct[]>([])
   const [categories, setCategories] = useState<ICategory[]>([])
   console.log(categories)
   const navigate = useNavigate()
   const [form] = Form.useForm<IInputProduct>()
   const { id } = useParams()
   const dispatch = useAppDispatch()
   const { images, listId, imagesSelected } = useAppSelector(allPropertiesSelector)
   const { Option } = Select
   const layout = {
      labelCol: {
         span: 5
      },
      wrapperCol: {
         span: 16
      }
   }
   useEffect(() => {
      form.setFieldValue('images', imagesSelected)
   }, [imagesSelected])
   useEffect(() => {
      ;(async () => {
         try {
            const {
               data: { data }
            } = await getAllType()
            setTypes(data)
         } catch (error) {
            console.log(error)
         }
      })()
   }, [])
   useEffect(() => {
      ;(async () => {
         try {
            const {
               data: { data }
            } = await getOneProduct(id)
            const imagesList = data?.images.map((img: IImage) => img._id)
            const imagesOfUser = JSON.parse(localStorage.getItem('user') as string)?.images
            dispatch(imageSlice.actions.setImages(imagesOfUser))
            dispatch(imageSlice.actions.setImagesSelected(imagesList))
            form.setFieldsValue({ ...data, categories: [], images: imagesList })
         } catch (error) {
            console.log(error)
         }
      })()
   }, [])
   const handleChangeRadio = (e: RadioChangeEvent) => {
      form.setFieldValue('type', e.target.value)
      const typeChecked = types.find((type) => type._id === e.target.value)
      setCategories(typeChecked?.subCategories!)
   }
   const onFinish = async (values: IInputProduct) => {
      try {
         setIsLoading(true)
         await updateProduct(id, values)
         setIsLoading(false)
         dispatch(imageSlice.actions.setImagesSelected([]))
         message.success('Update product successfully!')
         navigate('/admin/products')
      } catch (error) {
         message.error('Update product failed!')
         console.log(error)
      }
   }
   if (isLoading) return <Loading />
   return (
      <div className='w-full flex justify-center flex-col items-center'>
         <h2 className='p-5 font-semibold text-lg'>Update product</h2>
         <Form
            form={form}
            name='update'
            {...layout}
            size='large'
            className='w-1/2 flex flex-col items-center justify-center'
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
            encType='multipart/form-data'
         >
            <Form.Item
               validateTrigger={'onBlur'}
               label={<label className='block'>Product Name</label>}
               hasFeedback
               className='w-full'
               name='name'
               rules={[{ required: true, message: 'Please input product name!' }]}
            >
               <Input />
            </Form.Item>

            <Form.Item
               validateTrigger={'onBlur'}
               label={'Price'}
               hasFeedback
               className='w-full'
               name='price'
               rules={[{ required: true, message: 'Please input product price!' }]}
            >
               <InputNumber step={1} min={0} className='w-full' />
            </Form.Item>
            <Form.Item
               name={'images'}
               valuePropName='images'
               label={'Images'}
               hasFeedback
               className='w-full'
               rules={[{ required: true, message: 'Please input product image!' }]}
            >
               <div className='flex gap-2 flex-wrap'>
                  {images
                     ?.filter((img: IImage) => {
                        if (imagesSelected.includes(img._id)) return img
                     })
                     .map((img: IImage) => (
                        <FileImage
                           className='basis-[20%] h-[100px]'
                           key={img._id}
                           typeMask='sync'
                           src={img.url}
                           publicId={img.publicId}
                           idImageMongo={img._id}
                        />
                     ))}
                  {imagesSelected.length < 3 && (
                     <div
                        className='border-gray-400 hover:bg-gray-200 duration-300 border p-5 w-[30%] rounded-lg cursor-pointer'
                        onClick={() => setIsOpen(true)}
                     >
                        {<PlusOutlined />}
                        <div>Select images</div>
                     </div>
                  )}
                  <ModalUpload isOpen={isOpen} onClose={handleCloseModal} onAdd={handleOnAdd} />
               </div>
            </Form.Item>
            <Form.Item
               validateTrigger={'onBlur'}
               label={'Description'}
               hasFeedback
               className='w-full'
               name='description'
               rules={[{ required: true, message: 'Please input product description!' }]}
            >
               <Input.TextArea />
            </Form.Item>
            <Form.Item
               validateTrigger={'onBlur'}
               label={<label className='block'>Type Of Product</label>}
               hasFeedback
               className='w-full'
               name='type'
               rules={[{ required: true, message: 'Please choose one general type product!' }]}
            >
               <Radio.Group onChange={handleChangeRadio}>
                  {types?.map((type, i) => (
                     <Radio key={i} value={type._id} className='uppercase'>
                        {type.name}
                     </Radio>
                  ))}
               </Radio.Group>
            </Form.Item>
            <Form.Item
               validateTrigger={'onBlur'}
               label={'Categories'}
               hasFeedback
               className='w-full'
               name='categories'
               rules={[{ required: true, message: 'Please choose categories!' }]}
            >
               <Select
                  mode='multiple'
                  style={{ width: '100%' }}
                  placeholder='Choose categories'
                  optionLabelProp='label'
               >
                  {categories?.map((category, index) => (
                     <Option key={index} value={category._id} label={category.name}>
                        {category.name}
                     </Option>
                  ))}
               </Select>
            </Form.Item>
            <Form.Item className='w-full' wrapperCol={{ offset: 8, span: 16 }}>
               <ConfigProvider
                  theme={{
                     token: {
                        colorPrimary
                     }
                  }}
               >
                  <Button type='primary' htmlType='submit' className='bg-red-400 absolute left-2/3'>
                     Submit
                  </Button>
               </ConfigProvider>
            </Form.Item>
         </Form>
      </div>
   )
}

export default UpdateProduct
