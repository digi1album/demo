import React,{useState, useEffect} from 'react'
import Loading from './Loading';
import {AiOutlineDownload, AiFillCloseCircle,AiOutlineStar, AiFillStar } from 'react-icons/ai'
import '../index.css'

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

             
              const [isFavourite, setIsFavourite] = useState(false);
              const buttonClass = isFavourite ? 'bounce' : '';
              const handleFavourite = () => {
                setIsFavourite((prevState) => !prevState);
  //   // Data to upload to Firestore
  // const textData = {
  //   text: 'This is the text you want to upload to Firestore',
  //   // timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  // };

  // // Reference to a Firestore collection (replace 'your_collection_name' with your desired collection name)
  // const collectionRef = firestore.collection('your_collection_name');

  // // Add the text data to Firestore
  // collectionRef
  //   .add(textData)
  //   .then((docRef) => {
  //     console.log('Text data uploaded with ID: ', docRef.id);
  //   })
  //   .catch((error) => {
  //     console.error('Error uploading text data: ', error);
  //   });
  };
  
      useEffect(()=>{
                targetPhotoHd && getPhoto()
              },[])

              const handleModalClick=(e)=>{
                // Close the modal if the user clicks outside of it
           if (e.target === e.currentTarget) {
             onClose();
           }
           }
          
    return (
      <div className="">
      {photo ? 
      (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-80" onClick={handleModalClick}>
      <div className="inset-0 ">
       <div className="rounded-lg  max-w-screen-md  w-full overflow-hidden border3-shadow">
       <div className='flex flex-row fixed top-5 right-10 '>
       <button
              onClick={handleFavourite}
              className={`pr-2 text-5xl/ text-[#FF512F] icons-size ${buttonClass}`}
            >
              {isFavourite ? <AiFillStar /> : <AiOutlineStar />}
            </button>
                <button
              onClick={handleDownload}
              className={`text-5xl/ text-[#FF512F] icons-size ${buttonClass}`}
            >
              < AiOutlineDownload/>
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
      </div>
    ) : <div className='fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50'><Loading/></div>} 
      </div>
    );
  };
  
  export default Modal