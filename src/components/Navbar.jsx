import React, { useState } from 'react'
import { Navbar } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import LogoImage from "../Assets/images/logo.png"

 const NavbarDefault = ()=> {

  const [mobileOpen, setMobileOpen]= useState(true)

  const {user, logout} = UserAuth()

  const navigate = useNavigate()

  const handleClick= async ()=>{
    try{
        await logout();
        navigate('/')
    }
    catch(e)
    {
      console.log(e)
    }
  }

  const handleMobileMenu =()=>{
    setMobileOpen(!mobileOpen);  //toggle the state of mobile menu
  }
  
  const closeMobileMenu= ()=>{
    setMobileOpen(false)
  }

  return (
<Navbar fluid className='bg-opacity-90 bg-gray-200 sticky top-0 h-10 md:h-16 z-50'>
      <Navbar.Brand>
        <span className="self-center whitespace-nowrap flex flex-row">
          <img src={LogoImage} alt="logo" className='h-4 md:h-9 w-auto'/> <p className='text-sm mb-4 ml-2 md:text-xl font-semibold'>digiAlbum</p>
        </span>
      </Navbar.Brand>

      <Navbar.Toggle onClick={handleMobileMenu} />

      <Navbar.Collapse className={`bg-white bg-opacity-90 text-black md:bg-transparent ${mobileOpen ? 'block': 'hidden'}`}>
      
        <Navbar.Link
          onClick={closeMobileMenu}
        >
          <p className='text-black md:text-gray-700'>
            <Link to='/'> Home</Link>
          </p>
        </Navbar.Link >

        <Navbar.Link onClick={closeMobileMenu} className=' text-black md:text-gray-700'>
          <Link to='/media'>Media</Link>
        </Navbar.Link>

        

        <Navbar.Link onClick={closeMobileMenu} className='text-black md:text-gray-700'>
          <Link to='/contact'>Contact Us</Link>
        </Navbar.Link >
        {
          user && (
            <div className='flex flex-row space-x-3'>
                <Navbar.Link onClick={closeMobileMenu} className=''>
              
                  <button type="button" className="btn-grad" onClick={handleClick}>Log Out</button>
                </Navbar.Link>
                <Navbar.Link onClick={closeMobileMenu} className=''>
                <button type="button" className="btn-grad" onClick={()=>navigate('/password_update')}>Update Password</button>
              </Navbar.Link>
          </div>
          )
        }
      </Navbar.Collapse>
      
    </Navbar>

  )
}

export default NavbarDefault