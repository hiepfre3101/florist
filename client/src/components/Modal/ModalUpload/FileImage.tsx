import { useEffect, useRef } from 'react'
import { Image } from 'antd'

import { useAppDispatch, useAppSelector } from '../../../hooks/redux/hooks'
import { imageSlice, listOfIdMongoSelector } from '../../../slices/imageSlice'
import MaskImage from '../../Mask/MaskImage'
type Props = {
   src: string
   publicId: string
   className?: string
   idImageMongo: string
   // sync : use to remove node without any async action
   // async : use to delete item in db
   typeMask: 'sync' | 'async'
}

const FileImage = ({ src, publicId, className, idImageMongo, typeMask }: Props) => {
   const imageRef = useRef<HTMLDivElement>(null)
   const dispatch = useAppDispatch()
   const listId = useAppSelector(listOfIdMongoSelector)
   useEffect(() => {
      const handleMultiSelect = (e: MouseEvent) => {
         if (e.ctrlKey) {
            if (listId.length < 3) {
               dispatch(imageSlice.actions.pushIdMongo(idImageMongo))
            }
         } else {
            dispatch(imageSlice.actions.setIdsMongo([idImageMongo]))
         }
      }
      if (typeMask === 'async') imageRef?.current?.addEventListener('click', handleMultiSelect)
      return () => {
         imageRef?.current?.removeEventListener('click', handleMultiSelect)
      }
   })
   return (
      <div
         className={className + ` relative ${listId.includes(idImageMongo) && 'border-2 border-blue-400'}`}
         ref={imageRef}
      >
         <Image
            width={'100%'}
            height={'100%'}
            src={src}
            alt='item'
            className='h-[50%] w-[50%] rounded-lg relative'
            preview={{
               mask: <MaskImage type={typeMask} publicId={publicId} idImageMongo={idImageMongo} />,
               visible: false
            }}
         />
      </div>
   )
}

export default FileImage
