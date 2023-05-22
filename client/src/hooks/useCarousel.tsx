import { CarouselRef } from 'antd/es/carousel'
import { useRef, useState } from 'react'
import { RightOutlined, LeftOutlined } from '@ant-design/icons'
type Props = {
   list: any[]
}
type ArrowProps = {
   className?: string
}
const useCarousel = ({ list }: Props) => {
   const [currentSlide, setCurrentSlide] = useState<number>(0)
   const carouselRef = useRef<CarouselRef>(null)
   const handleNext = () => {
      carouselRef?.current?.next()

      if (currentSlide === list.length - 1) {
         return setCurrentSlide(0)
      }
      return setCurrentSlide(currentSlide + 1)
   }
   const handlePrev = () => {
      carouselRef?.current?.prev()
      if (currentSlide === 0) {
         return setCurrentSlide(list.length - 1)
      }
      return setCurrentSlide(currentSlide - 1)
   }
   const NextArrow = ({ className }: ArrowProps) => {
      return (
         <button
            onClick={handleNext}
            className={`z-40 absolute hover:p-5 duration-300 right-5 top-[40%] p-4 bg-transparent drop-shadow-lg shadow-md rounded-full !text-white font-normal text-md flex justify-center items-center`}
         >
            <RightOutlined />
         </button>
      )
   }
   const PrevArrow = ({ className }: ArrowProps) => (
      <button
         onClick={handlePrev}
         className={`z-40 absolute hover:p-5 duration-300 left-4 top-[40%] p-4 bg-transparent drop-shadow-lg shadow-md rounded-full !text-white font-normal text-md flex justify-center items-center`}
      >
         {' '}
         <LeftOutlined />
      </button>
   )
   return { carouselRef, NextArrow, PrevArrow ,setCurrentSlide,currentSlide}
}

export default useCarousel
