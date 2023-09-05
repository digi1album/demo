import React,{useState, useEffect} from 'react'
import Loading from './Loading';
import {AiOutlineDownload, AiFillCloseCircle} from 'react-icons/ai'


const Modal = ({  onClose, targetPhoto, s3_sdk, bucket}) => {
    const [photo, setPhoto] = useState(null)
    const targetPhotoHd = targetPhoto.replace("T_","")
    
    const params ={
      Bucket: bucket,
      Key: targetPhotoHd
    }
    const getPhoto=async ()=>{
      try{
        // fetching data from wasabi
          console.log("calling......")
            const data = await s3_sdk.getObject(params).promise();
  
            // creating the blob from the binary data
            const blob = new Blob([data.Body], { type: 'image/jpeg' });
            // Create an object URL from the Blob
            const url = URL.createObjectURL(blob);
  
            setPhoto(url)
            console.log(data, url)
            return url;
          }
          catch(e)
          {
            console.log("error occured: ", e.message)
          }
            }
        
       const handleDownload = () => {
              const link = document.createElement('a');
              link.href = photo;
              link.download = 'image.jpg'; // Replace with desired filename
              link.click();
            };
  
  
      useEffect(()=>{
                targetPhotoHd && getPhoto()
              },[])
          
    return (
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-80">
      {photo ? 
      (
      <div className="inset-0 ">
       <div className="rounded-lg  max-w-screen-md  w-full overflow-hidden border3-shadow">
       <div className='flex flex-row fixed top-5 right-10 '>
                <button
              onClick={handleDownload}
              className=" text-5xl/ text-[#FF512F] icons-size"
            >
              <AiOutlineDownload />
            </button>

            <button
          onClick={onClose}
          className="ml-10 text-xl text-[#FF512F] icons-size"
        >
          <AiFillCloseCircle/>
        </button>
        </div>
        <div className='h-full overflow-visible'>
         <img src={photo} alt="Original" className='rounded-lg w-full h-full phhh' /> 
        </div>

      </div>
      </div>
    ) : <div className='top-32'><Loading/></div>} 
      </div>
    );
  };
  
  export default Modal