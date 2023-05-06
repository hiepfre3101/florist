import { Link } from 'react-router-dom'
import { ShoppingCartOutlined, SearchOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Dropdown, Space } from 'antd'

import { useAppSelector } from '../../hooks/redux/hooks'
import { selectAuthStatus, selectorUser } from '../../auth/authSlice'
import { itemsNavClient } from '../../configAntd/navItems'
import { useRef, useState } from 'react'
type Props = {
   logout: () => void
}
const Header = ({ logout }: Props) => {
   const isLogin = useAppSelector(selectAuthStatus)
   const user = useAppSelector(selectorUser)
   const items = itemsNavClient({ logout })
   const logoWhiteLink =
      'https://res.cloudinary.com/diqyzhuc2/image/upload/v1683345380/hoaUi/0361be2445bb4c368a5d0a624cd6cba8-removebg-preview_oasrcf.png'

   return (
      <header className='overflow-hidden w-full flex justify-between items-center py-1 px-14  z-30 text-primary bg-yellowW'>
         <Link to='/' className='w-[20%] h-[75px] flex items-center justify-center pt-5'>
            <img src={logoWhiteLink} className='w-full mb-10 ' />
         </Link>
         <nav className='flex items-center gap-10 flex-1 justify-center'>
            <Link to={'/new'} className='text-md font-semibold'>New</Link>
            <Link to={'/bouquets'} className='text-md font-semibold'>Bouquets</Link>
            <Link to={'/flowers'} className='text-md font-semibold'>Flowers</Link>
         </nav>
         {isLogin ? (
            <div className='flex gap-2 justify-evenly w-[14%] items-center text-greenY'>
               <SearchOutlined className='cursor-pointer text-xl' />
               <ShoppingCartOutlined className='cursor-pointer text-xl' />
               <Dropdown menu={{ items }} trigger={['click', 'hover']}>
                  <img src={user?.avatarDefault} alt='img' className='w-[20%] cursor-pointer' />
               </Dropdown>
            </div>
         ) : (
            <div className='h-full w-[20%] flex justify-center'>
               {' '}
               <Link to={'/auth'}>
                  <button className='bg-primary p-3 text-white'>Join us</button>
               </Link>
            </div>
         )}
      </header>
   )
}

export default Header
