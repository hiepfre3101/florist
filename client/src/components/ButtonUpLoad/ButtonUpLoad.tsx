import { useState } from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { message, Modal, Upload } from 'antd'
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface'
import type { FormInstance } from 'antd'

import { IImage } from '../../interface/image'
type Props = {
   form: FormInstance
   className?: string
}
// read file by Web API FileReader to get data base64 of file
const getBase64 = (file: RcFile): Promise<string> =>
   new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
   })
// validate file
const beforeUpload = (file: RcFile) => {
   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
   if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
   }
   const isLt2M = file.size / 1024 / 1024 < 2
   if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
   }
   return false
}

const ButtonUpLoad = ({ form, className }: Props) => {
   const [loading, setLoading] = useState(false)
   const [previewOpen, setPreviewOpen] = useState(false)
   const [previewImage, setPreviewImage] = useState('')
   const [files, setFiles] = useState<UploadFile[] | IImage[]>([])
   const uploadButton = (
      <div className='bg-primary rounded-lg min-w-[100px] p-2 font-semibold flex flex-col items-center justify-center text-white '>
         {loading ? <LoadingOutlined rev='' /> : <PlusOutlined rev='' />}
         <div className='text-sm'>Upload from your device</div>
      </div>
   )
   const handlePreview = async (file: UploadFile) => {
      if (!file.url && !file.preview) {
         file.preview = await getBase64(file.originFileObj as RcFile)
      }
      setPreviewImage(file.url || (file.preview as string))
      setPreviewOpen(true)
   }
   const handleCancel = () => setPreviewOpen(false)
   const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
      form.setFieldValue('images', newFileList)
      setFiles(newFileList)
   }
   return (
      <Upload
         name='images'
         className={className}
         beforeUpload={beforeUpload}
         onPreview={handlePreview}
         onChange={handleChange}
         fileList={files as UploadFile[]}
         multiple
         maxCount={3}
      >
         <div className='flex justify-start gap-3 flex-wrap w-full'>
            {files!.length >= 3 ? null : uploadButton}
            <Modal footer={null} onCancel={handleCancel} open={previewOpen}>
               <img alt='example' style={{ width: '100%' }} src={previewImage} />
            </Modal>
         </div>
      </Upload>
   )
}

export default ButtonUpLoad
