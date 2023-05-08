import React from 'react'

type Props = {
   title: string
   action: {
      changeStatus: (s: 'sign in' | 'sign up') => void
      name: 'sign in' | 'sign up'
   }
}

const FooterForm = ({ title, action }: Props) => {
   return (
      <div className='flex mt-5 justify-between w-full'>
         <p className='text-primary uppercase'>{title}</p>
         <p onClick={() => action.changeStatus(action.name)} className='text-greenY uppercase cursor-pointer'>
            {action.name}
         </p>
      </div>
   )
}

export default FooterForm
