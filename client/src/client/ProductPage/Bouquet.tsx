import Breadcrumb from '../../components/Breadcrumb'
import React from 'react'

type Props = {}

const Bouquet = (props: Props) => {
   return (
      <div className='min-h-[100vh] pl-36 pr-16 w-full h-[500px] pt-10'>
       <div className='flex justify-between w-full items-center'>
           <h2 className='text-[3rem] text-primary font-semibold'>Popular Bouquets</h2>
           <Breadcrumb />
       </div>
       <hr className='text-[rgba(0,0,0,0.1)]'/>
      </div>
   )
}

export default Bouquet
