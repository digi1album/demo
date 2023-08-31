import React from 'react'
import { card_data } from '../Assets/data'

export const Cards = () => {
  return (
    
    <div className='m-6 md:m-14 flex flex-col mt-5'>
        <div className='text-2xl text-center text-white md:text-4xl font-extrabold font-mono'>
            Why Us?
        </div>

        {/* card */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-5'>

        
        {
            card_data.map((item)=>{
                return(
                    <div key={item.id} className={`col-span-full md:grid-start-${item.id} md:col-span-1`}>
                        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                    {/* Image */}
                                    <div className='max-h-sm'>
                                        <img class="rounded-t-lg" src={item.imageUrl} alt="" />
                                    </div>
                                    {/* Title and Description */}
                                    <div class="p-2 md:p-5">
                                        <a href="/#">
                                            <h5 class="mb-2 text-lg md:text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> {item.title}</h5>
                                        </a>
                                        <p class="mb-3 font-normal text-xs md:text-base text-gray-700 dark:text-gray-400">{item.description}</p>
                                        
                                    </div>
                                </div>
                    </div>
                )
            })
        }
        </div>

    </div>
  )
}
