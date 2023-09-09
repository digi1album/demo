import React from 'react'
import {ImMobile} from 'react-icons/im'
import {AiOutlineWhatsApp, AiTwotoneMail} from 'react-icons/ai'
import ContactForm from '../components/form'

const handleSubmit=(e)=>{
  e.preventDefault()
  console.log(
    "Name: ",e.target.floating_first_name.value, " ", e.target.floating_last_name.value
  )
}


export const Contact = () => {
  return (
    <div className='min-h-screen grid grid-cols-1 md:grid-cols-2 justify-center items-center'>
      {/* Left section */}
      <div className='col-span-full md:col-start-1 md:col-span-1'>
          <div className='flex flex-col justify-start ml-14 md:ml-48 space-y-10'>
                <div className='flex flex-row space-x-3'>
                  <ImMobile className='mt-1 text-2xl' /> <a href={`tel:+91 7768058802`} className='text-black font-bold text-xl'>+91 7768058802</a>
                </div>
                <div className='flex flex-row space-x-3'>
                  <AiOutlineWhatsApp className='mt-1 text-2xl' /> <a href={`https://api.whatsapp.com/send?phone=917768058802&text=Hello,%20We%20would%20like%20to%20know%20more%20about%20digiAlbum...`} className='text-black font-bold text-xl'>+91 7768058802</a>
                </div>
                <div className='flex flex-row space-x-3'>
                  <AiTwotoneMail className='mt-1 text-2xl'/> <p className='text-black font-bold text-xl'>digi1album@gmail.com</p>
                </div>
          </div>
      </div>
{/* Right Section */}
      <div className='col-span-full md:col-start-2 md:col-span-1 mx-10 bg-slate-400 bg-opacity-50 rounded-md p-4 md:p-8'>


        
      <ContactForm />


    </div>

    </div>
  )
}
