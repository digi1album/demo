import React,{useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import AWS from 'aws-sdk';
import Modal from '../components/Modal';
import Loading from '../components/Loading';
import Masonry from "react-masonry-css"
import ReactPaginate from 'react-paginate';



const pageSize = 100;


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
  const bucketName = "digialbum";
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
              const totalPages = Math.ceil(data_total.KeyCount/ pageSize);
              setTotalCount(totalPages);
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



  const handlePageChange = (e) => { 
    setCurrentPage(e.selected+1);
    window.scrollTo(0,0)
  };
  




var photos=[]
var videos=[]

 data && data.slice(1).map((i,index)=>{
  const params = { Bucket: bucketName, Key: i.Key };
  const isImage =/\.(JPG|PNG|png|jpeg|jpg)$/.test(i.Key);
  const isVideo = /\.(mp4|webm|mkv|mov)$/.test(i.Key);
  const signedUrl = s3.getSignedUrl('getObject', params);
  let obj= {
    url: signedUrl,
    Key: i.Key
  }
  if(isImage) {photos.push(obj)}
  if(isVideo) {videos.push(obj)}
})


  return (
    user ? 
   (<> <div className='mx-2 md:mx-5  mt-5 min-h-screen scroll-auto'>
    { data ? (

 photos.length > 0 ? (
  <Masonry
  breakpointCols={
                    {
                    // Number of columns by default
                default:  4 ,
                // Number of columns for screens 1100px and above
                1100:  3,
                // Number of columns for screens 700px and above
                700:  2
                }}
  className="my-masonry-grid gap-1 md:gap-3"
  columnClassName="my-masonry-grid_column"
>

   { photos.map((items, index)=>{
      return(
        <>
          <div key={items.Key} className={``}>
            <button  onClick={()=>openModal(items.Key)}>
              <img src={items.url} alt={`${items.Key}`} className='object-cover w-full h-full rounded-md' />
              </button>
          </div>
          
          {isModalOpen && (imgKey === items.Key && <Modal onClose={closeModal}  targetPhoto={items.Key} s3_sdk={s3} bucket={bucketName}/>)}
          </>
        )

    })}
    </Masonry>
): 

  videos.length>0 && (
    <Masonry
    breakpointCols={
                      {
                      // Number of columns by default
                  default:  3 ,
                  // Number of columns for screens 1100px and above
                  1100:  2,
                  // Number of columns for screens 700px and above
                  700:  1
                  }}
    className="my-masonry-grid gap-1"
    columnClassName="my-masonry-grid_column"
  >
    {
      videos.map((i,index)=>{

        const parts = i.Key.split('/')
    
        // Find the last dot (.) in the string
          const lastDotIndex = parts[parts.length-1].lastIndexOf('.');
          let resultString
          if (lastDotIndex !== -1) {
            // Extract the part of the string before the last dot
            resultString = parts[parts.length-1].substring(0, lastDotIndex);
          } else {
            // If there is no dot in the string, keep the original string
            resultString = parts[parts.length-1];
          }
          
        return(
            <div key={i.Key} className={`flex flex-wrap rounded-md mb-2 md:mb-5 mx-1 md:mx-2`}>
              
                <video src={i.url} className='w-full h-auto' controls/>
                <h1 className='text-black text-sm font-medium '>{resultString}</h1>  
            </div>
          )


      })
    }
    </Masonry>
  )



    ): <Loading />
    
    }

          
   </div>

         {/* <Pagination totalCount={totalCount} onPageChange={handlePageChange} currentPage={currentPage} /> */}
         <div className='flex justify-center'>
    <div className="fixed bottom-0 p-2 md:p-4 bg-black rounded-md bg-opacity-50 z-10 mb-2 md:mb-5 ">
      <div className='flex justify-center space-x-3'>
      <ReactPaginate
        previousLabel={"<Previous"}
        nextLabel={"Next>"}
        breakLabel={"•••"}
        pageCount={totalCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageChange}
        containerClassName={"flex flex-row justify-center space-x-3"}
        pageClassName={"btn-grad"}
        pageLinkClassName={""}
        previousClassName={"font-bold text-lg text-white"}
        previousLinkClassName={"font-bold text-lg"}
        nextClassName={"font-bold text-lg text-white"}
        nextLinkClassName={"font-bold text-lg"}
        breakClassName={"space-x-2"}
        breakLinkClassName={"text-white"}
        activeClassName={"border border-2 border-white"}
      />
      </div>
    </div>
    </div>
    
  </>) : (
      <div className='text-center mt-12 md:my-40 text-6xl font-bold text-black min-h-screen'>
        Please Log In! </div>
    )
  )
}
