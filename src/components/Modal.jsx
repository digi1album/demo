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
      <div className="fixed inset-0 flex items-center justify-center z-40 bg-black bg-opacity-75 ">
      {photo ? 
      (
      <div className="inset-0">
       <div className="bg-white p-2 md:p-6 rounded-lg  max-w-screen-md h-[60vh] md:h-[90vh] w-auto overflow-hidden">
        <div className='h-full overflow-visible'>
         <img src={photo} alt="Original" className='rounded-lg w-auto h-full' /> 
        </div>
        <div className='flex flex-row fixed bottom-10'>
        <button
          onClick={onClose}
          className="mt-2 px-4 py-2 bg-gray-500 bg-opacity-80 text-white rounded hover:bg-gray-600"
        >
          Close
        </button>
        <button
              onClick={handleDownload}
              className="ml-5 px-4 py-1 mt-2 bg-blue-500  text-white rounded bg-opacity-80 hover:bg-blue-600"
            >
              Download
            </button>
          </div>
      </div>
      </div>
    ) : <div className='top-32'><Loading/></div>} 
      </div>
    );
  };
  
  export default Modal