import React, {useState} from 'react'
import Image from '../Assets/images/home-header.jpg'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function HeaderCard() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate= useNavigate();
  const {signIn, user} =UserAuth()

  const handleSubmit=async (e)=>{
    e.preventDefault()

    try{
        await signIn(email,password)
        navigate('/media')
    }
    catch(e)
    {
      toast.error(e.message
      , {
        position: toast.POSITION.TOP_CENTER
      });
      // console.log(JSON.parse(JSON.stringify(e.message)))
    }

  }
  return (

        <div className='flex flex-row bg-white bg-opacity-80 h-[200px] md:h-[450px] w-auto mx-4 min-[800px]:mx-20 xl:mx-32 mt-4 mb-2 md:mt-8 lg:mb-8'>

        {/* card */}
        <div className='relative'>
            <img src={Image} alt='header' className='inline-flex h-[200px] md:h-[450px] w-auto lg:w-[450px]'/>

            <div className="absolute top-14 md:top-48 left-0 p-1 md:p-2 text-white bg-black bg-opacity-25">
              <div className="text-[6px] md:text-lg font-semibold md:font-bold w-[120px] md:w-[250px]">
                <span className='typing-animation animate-typing animate-reacting line-clamp-1'>Your Love Story, Always</span>
                <span className='typing-animation animate-typing animate-reacting line-clamp-1'> Accessible, Forever Unforgettable!</span>
              </div>
              
            </div>

        </div>

        {/* right log-in section */}
       

        <div className='p-2 min-[425px]:p-5 md:p-10 md:ml-8 md:mt-9'>
        {
          user ? (
             <div>
              <p className='text-sm md:text-3xl font-bold text-center m-2 md:m-4'>Welcome to Our Website</p>
              <p className='text-xs md:text-base text-center'>Enjoy Amazing Photos and Videos</p>
            {/* <button type="button" className="text-white m-2 md:mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-md md:rounded-lg text-xs md:text-sm  px-2 md:px-5 py-1.5 md:py-2.5 mb-2">Log Out</button> */}
            </div>
            ): (
              <form onSubmit={handleSubmit}>

              {/* Email */}
              <div className="mb-2 md:mb-6">
                  <label for="email" className="block mb-2 text-xs md:text-xl font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" id="email" className="rounded-md md:round-lg h-[30px] md:h-auto w-[130px] min-[425px]:w-[190px] md:w-[350px] lg:w-[450px] border-none" placeholder="name@mail.com"   required 
                  onChange={(e)=>setEmail(e.target.value)}/>
              </div>
  
              {/* Password */}
              <div className="mb-1 md:mb-6">
                  <label for="password" className="block mb-2 text-xs md:text-xl  font-medium text-gray-900 dark:text-white">Your Password</label>
                  <input type="password" id="password" className="rounded-md md:round-lg  h-[30px] md:h-auto  w-[130px] min-[425px]:w-[190px] md:w-[350px] lg:w-[450px] border-none"  required
                  onChange={(e)=>setPassword(e.target.value)}/>
              </div>
            
            {/* Submit button */}
          
              <button type="submit" className="text-white m-2 md:mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-md md:rounded-lg text-xs md:text-sm  px-2 md:px-5 py-1.5 md:py-2.5 text-center  mb-2">Submit</button>
              <ToastContainer />
              </form>

            )
        }
            


        </div>

    </div>
  )
}


