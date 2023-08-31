import React,{useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import AWS from 'aws-sdk';
import Modal from '../components/Modal';
import Loading from '../components/Loading';
import Masonry from 'react-masonry-css';


const pageSize = 20;


function Pagination({ totalCount, onPageChange }) {
  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    
    <div className='flex justify-center'>
    <div className="fixed bottom-0 p-2 md:p-4 bg-white rounded-md bg-opacity-40 z-10 mb-2 md:mb-5 ">
      <div className='flex justify-center space-x-3 items-center'>
      {pageNumbers.map((pageNumber) => (
        <button className='text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-sm md:rounded-md text-[20px]  px-1 md:px-2.5 py-0.5 ' key={pageNumber} onClick={() => handlePageClick(pageNumber)}>
          {pageNumber}
        </button>
      ))}
      </div>
    </div>
    </div>
  );
}






export const MediaView = () => {
    const [data, setData] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imgKey, setImgKey] = useState(null)    
    const [totalCount, setTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);




  const openModal = (key) => {
    setIsModalOpen(true);
    setImgKey(key)
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

    const location = useLocation();
    const targetMedia = location.state;

    const {user , Link} = UserAuth()
    const targetLink= Link && Link[targetMedia.target]

    // wasabi credentials
  const wasabi_key_id = process.env.REACT_APP_WASABI_ACCESS_KEY_ID
  const wasabi_key= process.env.REACT_APP_WASABI_ACCESS_KEY
  const bucketName = "themoments";
  const region = "ap-southeast-1"; // Update with your bucket's region
  const endpoint = "https://s3.ap-southeast-1.wasabisys.com"; // Update with your Wasabi endpoint
  // const folderName = "Personal/Birthday/Photos/"; 

  // wasabi credentials
  const s3 = new AWS.S3({
    region: region,
    endpoint: endpoint,
    credentials:{
        accessKeyId: wasabi_key_id,
        secretAccessKey: wasabi_key
    }
  });
  AWS.config.update({
    region: region,
    accessKeyId: wasabi_key_id,
    secretAccessKey: wasabi_key,
});



const getData= async(pageNumber,continuationToken = undefined) =>{

      const params = {
        Bucket: bucketName,
        MaxKeys: pageSize,
        Prefix: targetLink,
        ContinuationToken: continuationToken,
      };

          if(pageNumber===1)
            {
              const data_total = await s3.listObjectsV2({
                Bucket: bucketName,
                Prefix: targetLink,
              }).promise();
              setTotalCount(data_total.KeyCount);
              console.log(data_total.KeyCount, "count")
            }

      if (pageNumber > 1) {
        const objectsToSkip = (pageNumber - 1) * pageSize;
        const initialPage = await s3.listObjectsV2(params).promise();
        params.ContinuationToken = initialPage.NextContinuationToken;
  
        for (let i = 0; i < ((objectsToSkip / pageSize)-1); i++) {
          const nextPage = await s3.listObjectsV2(params).promise();
          params.ContinuationToken = nextPage.NextContinuationToken;
        }
      }

      console.log("final token: ", params.ContinuationToken)
  
      try {
        const response = await s3.listObjectsV2(params).promise();
        const conv_data= await JSON.parse(JSON.stringify(response.Contents))
        setData(conv_data)
        return response;
      } catch (error) {
        throw error;
      }

  }

  useEffect(()=>{
    targetLink && getData(currentPage)
  },[targetLink, currentPage])


  console.log("page: ", currentPage, "data: ", data)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const breakpointColumnsObj = {
    default: 4, // Number of columns by default
    1100: 4,    // Number of columns for screens 1100px and above
    700: 3      // Number of columns for screens 700px and above
  };
  return (
    user ? 
   (<> <div className='mx-2 md:mx-5  mt-5 min-h-screen'>
    {data ? 
    (<Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      { data.slice(1).map((i,index)=>{
      const params = { Bucket: bucketName, Key: i.Key };
      const isImage = i.Key.endsWith('.JPG') || i.Key.endsWith('.png') || i.Key.endsWith('.jpeg');
      const isVideo = i.Key.endsWith('.mp4') || i.Key.endsWith('.webm') || i.Key.endsWith('.mkv');
      const signedUrl = s3.getSignedUrl('getObject', params);
// photos
      if(isImage){
        return(
          <>
            <div key={i.Key} className={``}>
              <button  onClick={()=>openModal(i.Key)}>
                <img src={signedUrl} alt={`${i.Key}`} className='object-cover w-full h-full rounded-md' />
                </button>
            </div>
            
            {isModalOpen && (imgKey === i.Key && <Modal onClose={closeModal}  targetPhoto={i.Key} s3_sdk={s3} bucket={bucketName}/>)}
            </>
          )
      }


      // videos
      if(isVideo)
      {
        return(
            <div key={i.Key} className={`rounded-md`}>
              
                <video src={signedUrl} className='w-full h-auto' controls/>  
            </div>
          )
      }

      
    })}</Masonry>)   : <Loading /> }
          
   </div>

        <Pagination totalCount={totalCount} onPageChange={handlePageChange} />
    
  </>) : (
      <div className='text-center mt-12 md:my-40 text-6xl font-bold text-white min-h-screen'>
        Please Log In! </div>
    )
  )
}
