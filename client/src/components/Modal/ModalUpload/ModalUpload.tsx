import { useState, useEffect } from 'react'
import { CloseOutlined } from '@ant-design/icons'
import { Form, UploadFile, message, Modal, Button } from 'antd'

import { useAppSelector, useAppDispatch } from '../../../hooks/redux/hooks'
import { imageSlice, imagesSelector, listOfIdMongoSelector } from './imageSlice'
import ButtonUpLoad from '../../ButtonUpLoad/ButtonUpLoad'
import Loading from '../../Loading/Loading'
import { uploadImage } from '../../../api/upload/uploadImage'
import { getUser } from '../../../api/user/user'
import FileImage from './FileImage'
import { deleteImage } from '../../../api/upload/deleteImage'

type Props = {
   isOpen: boolean
   onClose: () => void
   onAdd: () => void
}
const onFinishFailed = (errorInfo: any) => {
   console.log(errorInfo)
   message.error('Upload your images please !')
}

const ModalUpload = ({ isOpen, onClose, onAdd }: Props) => {
   const [isLoading, setIsLoading] = useState(false)
   const [form] = Form.useForm()
   const dispatch = useAppDispatch()
   const images = useAppSelector(imagesSelector)
   const listId = useAppSelector(listOfIdMongoSelector)
   const userId = JSON.parse(localStorage.getItem('user') as string)?._id
   const ctr = new AbortController()
   useEffect(() => {
      ;(async () => {
         try {
            if (isOpen) {
               setIsLoading(true)
               const { data } = await getUser(userId)
               if (data.user?.images) {
                  dispatch(imageSlice.actions.setImages(data.user?.images))
               }
               setIsLoading(false)
            }
         } catch (error) {
            console.log(error)
         }
      })()
   }, [isOpen])
   const onFinish = async (values: any) => {
      try {
         setIsLoading(true)
         const { data, status } = await uploadImage(userId, values.images as UploadFile[], ctr)
         if (status !== 200 || !data) {
            setIsLoading(false)
            message.error(`Upload failed!`)
            return
         }
         message.success(`Upload ${form.getFieldValue('images')?.length} files successfully!`)
         const { data: userData } = await getUser(userId)
         dispatch(imageSlice.actions.setImages(userData.user?.images))
         setIsLoading(false)
      } catch (error) {
         console.log(error)
         setIsLoading(false)
         message.error(`Upload failed!`)
         ctr.abort()
      }
   }
   return (
      <Modal
         open={isOpen}
         onCancel={onClose}
         footer={
            <div className='flex gap-2 justify-end'>
               <Button disabled={listId.length === 0} onClick={() => dispatch(imageSlice.actions.setIdsMongo([]))}>
                  Cancel
               </Button>
               <Button disabled={listId.length === 0} onClick={onAdd}>
                  Add to product
               </Button>
            </div>
         }
         closable={false}
         maskStyle={{ minHeight: 'screen', paddingBottom: '2rem' }}
         className=' min-w-[80%] top-[5%]  min-h-[50%] rounded-lg '
      >
         <div className='relative p-3 pb-5 border-b-[1px] border-gray-300 '>
            <p className='text-2xl font-semibold'>Select Image</p>
            <button
               onClick={onClose}
               className='duration-300 hover:bg-gray-100 p-3  rounded-full w-[50px] h-[50px] flex items-center justify-center text-gray-500 absolute top-2 right-5'
            >
               <CloseOutlined className='text-lg' />
            </button>
         </div>
         <div className='flex gap-3 w-full'>
            <div className='w-[30%] min-h-[500px]'>
               {isLoading ? (
                  <Loading />
               ) : (
                  <Form
                     form={form}
                     name='image'
                     size='large'
                     className='pr-3 overflow-hidden  relative h-full'
                     initialValues={{ remember: true }}
                     onFinish={onFinish}
                     onFinishFailed={onFinishFailed}
                     autoComplete='off'
                     encType='multipart/form-data'
                  >
                     <Form.Item
                        validateTrigger={'onChange'}
                        className='w-ful '
                        name='images'
                        rules={[{ required: true, message: '' }]}
                     >
                        <ButtonUpLoad form={form} className='absolute left-5 top-5 pr-3 ' />
                     </Form.Item>
                     <Form.Item className='absolute bottom-10 left-[40%] translate-x-[-50%]'>
                        <button className='ml-10 py-1 px-5 duration-500 font-semibold border rounded-md border-primary hover:bg-primary hover:text-white'>
                           Upload
                        </button>
                     </Form.Item>
                  </Form>
               )}
            </div>
            <div className='px-5 py-5 w-[70%]'>
               <p className='text-lg font-semibold'>Your Images</p>
               <div className='flex gap-5 flex-wrap mt-5 overflow-auto max-h-[80%]'>
                  {images.length !== 0 ? (
                     images.map((img, index) => (
                        <FileImage
                           typeMask='async'
                           src={img.url}
                           publicId={img.publicId}
                           key={index}
                           idImageMongo={img._id}
                           className='overflow-hidden duration-200 cursor-pointer w-[100px] h-[100px] hover:border-2 hover:border-blue-400 rounded-lg'
                        />
                     ))
                  ) : (
                     <h2 className='text-center'>Empty data</h2>
                  )}
               </div>
            </div>
         </div>
      </Modal>
   )
}

export default ModalUpload
