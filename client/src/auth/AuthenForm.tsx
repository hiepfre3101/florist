import React, { useState } from 'react'
import Login from './Login'
import Signup from './Signup'

type Props = {}

const AuthenForm = (props: Props) => {
   const [status, setStatus] = useState<'login' | 'signup'>('signup')
   const handleChangeStatus = (newStauts: 'login' | 'signup') => {
      setStatus(newStauts)
   }
   return (
      <div className='w-full h-screen bg-gray-200 flex justify-center items-center fixed top-0 left-0'>
         <div className='bg-white max-w-[90%] min-w-[1000px] h-[90%] rounded-lg p-5 relative'>
            <div
               className={`w-[300px] h-[95%] rounded-lg -z-0 bg-primary  absolute ${
                  status === 'login' ? 'right-5' : 'left-5'
               }`}
            ></div>
            <div className='flex justify-start'>
               <div className={`${status === 'login' ? 'flex-1' : 'min-w-[30%]'}`}>
                  <Login status={status} onChangeStatus={handleChangeStatus} />
               </div>
               <div className={`${status === 'signup' ? 'flex-1' : 'min-w-[30%]'}`}>
                  <Signup status={status} onChangeStatus={handleChangeStatus} />
               </div>
            </div>
         </div>
      </div>
   )
}

export default AuthenForm
