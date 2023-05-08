import React from 'react'
import { Link } from 'react-router-dom'

interface IChild {
   link: string
   title: string
   icon?: React.ReactNode
}
type Props = {
   label: string
   childItems: IChild[]
}

const Col = ({ label, childItems }: Props) => {
   return (
      <div className='flex flex-col items-start pt-10'>
         <p className='text-greenY uppercase'>{label}</p>
         <div className='flex flex-col gap-2 items-start mt-5'>
            {childItems.map((item, i) => (
               <Link to={item.link} key={i} className='text-white text-sm flex justify-start gap-3 items-center'>
                  {item.icon}
                  <p> {item.title}</p>
               </Link>
            ))}
         </div>
      </div>
   )
}

export default Col
