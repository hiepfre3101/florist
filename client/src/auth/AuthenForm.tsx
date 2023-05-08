import React, { useState } from 'react'
import Login from './Login'
import Signup from './Signup'

type Props = {}

const AuthenForm = (props: Props) => {
   const [status, setStatus] = useState<'sign in' | 'sign up'>('sign up')
   const handleChangeStatus = (newStauts: 'sign in' | 'sign up') => {
      setStatus(newStauts)
   }
   return (
      <div className='w-full flex justify-center items-center p-10'>
         {status === 'sign in' ? (
            <Login status={status} onChangeStatus={handleChangeStatus} />
         ) : (
            <Signup status={status} onChangeStatus={handleChangeStatus} />
         )}
      </div>
   )
}

export default AuthenForm
