import React from 'react'
import loader from '../Assets/images/movie-reel.svg'

export default function Loading() {
  return (
    <div className='flex justify-center items-center min-h-screen z-50'>
      <div className='fixed '>
         <img className='' src={loader} alt="Loading............" />
      </div>
    </div>
  )
}

