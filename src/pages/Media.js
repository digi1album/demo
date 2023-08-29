import React from 'react'
import { UserAuth } from '../context/AuthContext';
import {IoIosFolder} from "react-icons/io";
import {MdFolderShared} from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import Img from '../Assets/images/media-img.jpg'

export const Media = () => {

    const {user , Link} = UserAuth()
    let folders = Link && Object.keys(Link)
    const navigate=useNavigate()
console.log(folders);
if(folders)
{
    let index = folders.indexOf('userID');
            if (index !== -1) {
            folders = folders.slice(0, index).concat(folders.slice(index + 1));
            }
}

const handleClick=(e, targetFolder)=>{
    e.preventDefault()
    
    const propsToPass = {
        target: targetFolder,
      };
      navigate('/media/target', { state: propsToPass });
}

  return (
    <div className='min-h-screen flex flex-col md:flex-row md:justify-center mt-5 md:mt-0 is-center md:space-x-32'>
        {
          user ? ( folders ? folders.map((i,index)=>{
                return(
                    // <div key={index}>
                        
                    //      <button onClick={(e)=>handleClick(e,i)} className='flex flex-col items-center mb-5'>
                    //             <MdFolderShared className='text-xl md:text-6xl text-[#f4f444]'/>
                    //             <span className='text-lg md:text-2xl font-semibold text-white'>{ i }</span>
                    //     </button>
                        
                    // </div>
                    <div key={index} className={`col-span-full md:grid-start-${index} md:col-span-1 mt-5`}>
                    <div class="max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                {/* Image */}
                                <div className='max-h-xs'>
                                    <img class="rounded-t-lg" src={Img} alt="" />
                                </div>
                                {/* Title and Description */}
                                <div class="p-2 md:p-5">
                                      <button onClick={(e)=>handleClick(e,i)} className='flex flex-col items-center mb-5'>
                                          <span className='text-lg md:text-2xl font-semibold text-black'>{ i }</span>
                                      </button>
                                </div>
                            </div>
                </div>
                )
            }) : <Loading /> ) : (<div className='text-center mt-12 md:my-40 text-6xl font-bold text-white min-h-screen'>Please Log In!</div>)
        }
    </div>
  )
}
