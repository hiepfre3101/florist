import { Link } from 'react-router-dom'
import { ShoppingCartOutlined, SearchOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Dropdown, Space } from 'antd'

import { useAppSelector } from '../../hooks/redux/hooks'
import { selectAuthStatus, selectorUser } from '../../auth/authSlice'
import { itemsNavClient } from '../../configAntd/navItems'
type Props = {
   logout: () => void
}
const Header = ({ logout }: Props) => {
   const selectorIsLogin = useAppSelector(selectAuthStatus)
   const user = useAppSelector(selectorUser)
   const items = itemsNavClient({ logout })
   return (
      <header className='w-full flex justify-between items-center py-3'>
         <Link to='/' className='w-[14%] h-[100px] flex items-center justify-center pt-5'>
            <img
               src='https://res.cloudinary.com/diqyzhuc2/image/upload/v1681551602/hoaUi/feb9841299e04818be1098f0523f225a_1_cpycbf.png'
               className='w-[80%] aspect-square'
            />
         </Link>
         <nav className='flex items-center gap-10 flex-1 justify-center'>
            <Link to={'/new'}>New</Link>
            <Link to={'/bouquets'}>Bouquets</Link>
            <Link to={'/flowers'}>Flowers</Link>
         </nav>
         {selectorIsLogin ? (
            <div className='flex gap-2 justify-evenly w-[14%] items-center'>
               <SearchOutlined className='cursor-pointer text-xl' />
               <ShoppingCartOutlined className='cursor-pointer text-xl' />
               <Dropdown menu={{ items }} trigger={['click', 'hover']}>
                  <img src={user?.avatarDefault} alt='img' className='w-[20%] cursor-pointer' />
               </Dropdown>
            </div>
         ) : (
            <div className='h-full w-[14%] flex justify-end '>
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
