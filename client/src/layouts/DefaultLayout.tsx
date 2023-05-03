import { Outlet } from 'react-router-dom'

import Header from '../components/Header/Header'
type Props = {
   logout: () => void
}
const DefaultLayout = ({ logout }: Props) => {
   return (
      <div className='px-10 pb-10 max-w-[1480px] my-0 mx-auto min-h-screen'>
         <Header logout={logout} />
         <div className='w-full h-screen'>
            <Outlet />
         </div>
      </div>
   )
}

export default DefaultLayout
