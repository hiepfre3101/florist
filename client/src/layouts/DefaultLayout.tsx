import { Outlet } from 'react-router-dom'

import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
type Props = {
   logout: () => void
}
const DefaultLayout = ({ logout }: Props) => {
   return (
      <div className='max-w-[1920px] my-0 mx-auto relative'>
         <Header logout={logout} />
         <Outlet context={{ logout }} />
         <Footer />
      </div>
   )
}

export default DefaultLayout
