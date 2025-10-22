import { act, useContext } from 'react'
import { UserContext } from '../context/useContext'
import Navbar from './Navbar';
import SideMenu from './SideMenu';

function DashBoardLayout({children, activeMenu}) {

  const {user} = useContext(UserContext);

  return (
    <div className=''>
      <Navbar activeMenu={activeMenu}/>

      {user && (
        <div className='flex'>
          <div className='max-[1080px]:hidden'>
            <SideMenu activeMenu={activeMenu}/>
          </div>

          <div className='grow mx-5'>{children}</div>
          </div>

      )}
      
       </div>

  )
}

export default DashBoardLayout