import { useState } from 'react'

const NavBar = () => {
  let Links =[
    {name:"HOME",link:"/"},
    {name:"KEYS",link:"/credentials"},
    {name:"ACCOUNT",link:"/account"},
  ];
  let [open,setOpen]=useState(false);
  return (
    <div className="bg-white sticky top-0 z-[1] mx-auto  flex w-full flex-wrap items-center justify-between border-b border-gray-100 bg-background font-sans font-bold uppercase text-text-primary backdrop-blur-[100px] dark:border-gray-800 dark:bg-d-background dark:text-d-text-primary">
      <div className='md:flex items-center justify-between bg-white py-4 md:px-4 px-4'>
        <div className='cursor-pointer flex items-center'>
          <img className='mr-1 pt-2' src="/favicon.png" alt="logo" />
          {/* <img src="/favicon.png" alt="logo" /> */}
        </div>
        
        <div onClick={()=>setOpen(!open)} className='text-3xl absolute right-8 top-6 cursor-pointer md:hidden'>
          { open? 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          }
        </div>

        <ul className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ':'top-[-490px]'}`}>
          {
            Links.map((link)=>(
              <li key={link.name} className='md:ml-8 text-xl md:my-0 my-7'>
                <a href={link.link} className='text-gray-800 hover:text-gray-400 duration-500'>{link.name}</a>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default NavBar