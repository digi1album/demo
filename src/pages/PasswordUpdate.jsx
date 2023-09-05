import React, {useState} from 'react'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const PasswordUpdate = () => {
    const [newPassword, setNewPassword] = useState('')

    const {setPassword, logout} =UserAuth()

    const navigate = useNavigate()

    const handleSubmit=async(e)=>{
            e.preventDefault()

            try{
                const result = await setPassword(newPassword)
                await logout()
                toast.success("Your Password Updated Successfully! Please Log In Again. ",{
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 2000,
                })
                setTimeout(()=>navigate('/'),2500)
                
                
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
            <label for="password" className="block mb-2 text-xs md:text-xl  font-medium text-black">New Password</label>
            <input type="password" id="password" className="rounded-md md:round-lg  h-[30px] md:h-auto  w-[130px] min-[425px]:w-[190px] md:w-[350px] lg:w-[450px] inbut-border"  required
            onChange={(e)=>setNewPassword(e.target.value)}/>
        </div>

{/* Submit button */}

<button type="submit" className="btn-grad">Submit</button>
<ToastContainer />
</form>
    </div>
  )
}
