import { Spin } from 'antd'
import React from 'react'
import FlowerIcon from '../Icons/FlowerIcon'
const Loading = () => {
   const flowerIcon = <FlowerIcon className='spin' />
   return (
      <div className='flex justify-center items-center w-full h-full relative'>
         <Spin
            size='large'
            indicator={flowerIcon}
            className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'
         />
      </div>
   )
}

export default Loading
