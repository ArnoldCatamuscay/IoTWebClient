import './Nav.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { toast } from 'sonner';
import { useMqttStore } from '../store/mqtt-store';

const NavBar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const clientPaho = useMqttStore(state => state.clientPaho);
  const clear = useMqttStore(state => state.clear);

  const handleLogOut = async () => {
    try {
      if(clientPaho.isConnected()) clientPaho.disconnect();
      clear();
      setOpen(false);
      await logOut();
      toast.info("Hasta luego!");
      navigate('/');
    } catch (error: any) {
      toast.error(error.message); 
    }
  }

  let [open,setOpen]=useState(false);
  
  
  return (
    // <div className="bg-[#118AB2] sticky top-0 z-[1] mx-auto  flex w-full flex-wrap items-center justify-between border-b border-gray-100 bg-background font-sans font-bold uppercase text-text-primary backdrop-blur-[100px] dark:border-gray-800 dark:bg-d-background dark:text-d-text-primary">
    // <nav className='bg-[#0d2136] py-3 relative'>
    <nav className='bg-[#0d2136] py-3 sticky top-0 z-[1]'>
      <div className='container md:mx-auto md:flex px-4 md:px-0'>
        {/* LOGO */}
        <div className='flex flex-grow items-center' >
          <img src="/favicon.png" alt="logo" className='cursor-pointer' onClick={()=>navigate('/')}/>
        </div>
        
        
        {/* MENU */}
        <div onClick={()=>setOpen(!open)} className='absolute right-6 top-4 cursor-pointer md:hidden'>
          { open? 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#FFFFFF" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#FFFFFF" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          }
        </div>

        {/* NAV LINKS */}
        {/* <div className={`${open ? 'top-12 ':'top-[-490px]'} flex flex-grow justify-between`}> */}
          {
            user ?
              //IF USER IS PRESENT
              <div className={`md:flex flex-grow justify-between items-center ${open ? 'top-12 absolute bg-[#0d2136] w-full left-0 z-[1]':'hidden'} `}>
                {/* LINKS */}
                <div className='flex flex-col md:flex-row text-center'>
                  <Link to='/home' className='text-white hover:text-[#3f83d6] duration-500 md:mr-7 my-4 md:my-0 mb:text-2xl text-xl' onClick={()=>{setOpen(false)}}>Home</Link>
                  <Link to='/dashboard' className='text-white hover:text-[#3f83d6] duration-500 md:mr-7 my-4 md:my-0 mb:text-2xl text-xl' onClick={()=>{setOpen(false)}}>Dashboard</Link>
                </div>
                {/* BUTTONS */}
                <div className='flex flex-col md:flex-row text-center'>
                  <button onClick={handleLogOut} className='btn-register'>Log Out</button>
                </div>
              </div>
            :
              //IF USER IS NOT PRESENT
              <div className={`md:flex flex-grow justify-between items-center ${open ? 'top-12 absolute bg-[#0d2136] w-full left-0 z-[1]':'hidden'} `}>
                {/* LINKS */}
                <div className='flex flex-col md:flex-row text-center'>
                  <Link to='/' className='text-white hover:text-[#3f83d6] duration-500 md:mr-7 my-4 md:my-0 mb:text-2xl text-xl' onClick={()=>{setOpen(false)}}>Landing</Link>
                </div>
                {/* BUTTONS */}
                <div className='flex flex-col md:flex-row text-center'>
                  <Link to='/login' className='btn-login' onClick={()=>{setOpen(false)}}>Log In</Link>
                  <Link to='/register' className='btn-register' onClick={()=>{setOpen(false)}}>Register</Link>
                </div>
              </div>
          }
        {/* </div> */}
      </div>
    </nav>
  )
}

export default NavBar