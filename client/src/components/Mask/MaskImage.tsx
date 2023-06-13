import { useState } from 'react'
import { RestOutlined } from '@ant-design/icons'
import { Popconfirm, message } from 'antd'

import { useAppDispatch, useAppSelector } from '../../hooks/redux/hooks'
import { imageSlice, imagesSelectedSelector, imagesSelector } from '../../slices/imageSlice'
import { deleteImage } from '../../api/upload/deleteImage'
type Props = {
   publicId: string
   idImageMongo: string
   type: 'sync' | 'async'
}

const MaskImage = ({ publicId, idImageMongo, type }: Props) => {
   const [open, setOpen] = useState(false)
   const [confirmLoading, setConfirmLoading] = useState(false)
   const dispatch = useAppDispatch()
   const images = useAppSelector(imagesSelector)
   const imagesSelected = useAppSelector(imagesSelectedSelector)
   const ctr = new AbortController()
   const handleConfirm = async (publicId: string) => {
      try {
         setConfirmLoading(true)
         await deleteImage(publicId, idImageMongo, ctr)
         const newImages = images.filter((img) => img.publicId !== publicId)
         dispatch(imageSlice.actions.setImages(newImages))
         setOpen(false)
         setConfirmLoading(false)
      } catch (error) {
         console.log(error)
         message.error('Delete error!')
         setOpen(false)
         setConfirmLoading(false)
         ctr.abort()
      }
   }
   const handleCancel = () => {
      setOpen(false)
      ctr.abort()
   }
   const handleRemoveImgInForm = (idMongo: string) => {
      const newList = imagesSelected.filter((id) => {
         if (id !== idMongo) return id
      })
      dispatch(imageSlice.actions.setImagesSelected(newList))
   }
   return (
      <div className='z-[999] bg-[rgba(0,0,0,0.5)] w-full h-[100px] flex justify-center items-center absolute top-0'>
         {type === 'sync' && (
            <RestOutlined
               rev=''
               className='text-white text-lg z-50'
               onClick={() => handleRemoveImgInForm(idImageMongo)}
            />
         )}
         {type === 'async' && (
            <Popconfirm
               okButtonProps={{ loading: confirmLoading, className: 'bg-orangeH' }}
               open={open}
               title='Do you want delete this image?'
               description='If you delete this image, all products which use this image will be lost its image'
               onConfirm={() => handleConfirm(publicId)}
               onCancel={handleCancel}
            >
               {' '}
               <RestOutlined rev='' className='text-white text-lg z-50' onClick={() => setOpen(true)} />
            </Popconfirm>
         )}
      </div>
   )
}

export default MaskImage
