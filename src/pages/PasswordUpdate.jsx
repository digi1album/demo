import React, {useState} from 'react'
import { UserAuth } from '../context/AuthContext'


export const PasswordUpdate = () => {
    const [newPassword, setNewPassword] = useState('')

    const {setPassword} =UserAuth()

    const handleSubmit=async(e)=>{
            e.preventDefault()

            try{
                const result = await setPassword(newPassword)
                console.log(result)
            }
            catch(error)
            {
                console.log("==>",error)
            }
}
  return (
    <div className='min-h-screen flex justify-center items-center'>
            <form onSubmit={handleSubmit}>


        {/* Password */}
        <div className="mb-1 md:mb-6">
            <label for="password" className="block mb-2 text-xs md:text-xl  font-medium text-white">New Password</label>
            <input type="password" id="password" className="rounded-md md:round-lg  h-[30px] md:h-auto  w-[130px] min-[425px]:w-[190px] md:w-[350px] lg:w-[450px] border-none"  required
            onChange={(e)=>setNewPassword(e.target.value)}/>
        </div>

{/* Submit button */}

<button type="submit" className="text-white m-2 md:mt-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-md md:rounded-lg text-xs md:text-sm  px-2 md:px-5 py-1.5 md:py-2.5 text-center  mb-2">Submit</button>

</form>
    </div>
  )
}
