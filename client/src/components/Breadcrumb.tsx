import React from 'react'
import { Link } from 'react-router-dom'

type Props = {}
const fakeData = [
   {
      title: 'Home',
      path: '/'
   },
   {
      title: 'Bouquets',
      path: '/bouquets'
   }
]
const Breadcrumb = (props: Props) => {
   return (
      <div className='w-[20%] flex '>
         {fakeData.map((item, index) => (
            <Link
               to={item.path}
               className={`font-semibold  text-xl mr-3 ${
                  item.path === window.location.pathname ? 'text-greenY' : 'text-primary'
               }`}
               key={index}
            >
               {item.title}
               {index === fakeData.length - 1 ? '' : ' |'}
            </Link>
         ))}
      </div>
   )
}

export default Breadcrumb
