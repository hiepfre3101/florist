import { useState } from 'react'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { imageSlice, listOfIdMongoSelector } from '../components/Modal/ModalUpload/imageSlice'

const useTriggerUpload = () => {
   const [isOpen, setIsOpen] = useState<boolean>(false)
   const dispatch = useAppDispatch()
   const listId = useAppSelector(listOfIdMongoSelector)
   const handleCloseModal = () => {
      dispatch(imageSlice.actions.setIdsMongo([]))
      setIsOpen(false)
   }
   const handleOnAdd = () => {
      dispatch(imageSlice.actions.pushImagesSelected(listId))
      handleCloseModal()
   }
   return { isOpen,setIsOpen, handleCloseModal, handleOnAdd }
}

export default useTriggerUpload
