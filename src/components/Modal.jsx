import React,{useState, useEffect} from 'react'
import Loading from './Loading';


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
      photo ? 
      (<div className="fixed inset-0 flex items-center justify-center z-40">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="bg-white p-6 rounded-lg z-10 max-w-screen-md w-70vw h-70vh overflow-hidden">
        <div className='h-full overflow-visible'>
        { <img src={photo} alt="Original" className='rounded-lg w-full h-full' /> }
        </div>
          
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Close
        </button>
        <button
              onClick={handleDownload}
              className="ml-5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Download
            </button>
      </div>
    </div>) : <div className='top-32'><Loading/></div>
    );
  };
  
  export default Modal