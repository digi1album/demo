import React, { useState } from 'react';
import axios from 'axios';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const DownloadButton = () => {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);

    try {
      // Replace with your Wasabi cloud folder URL
      const folderUrl = 'AmolPhotography/Sabbinwar/SabbinwarWedding/Sumit/';

      // Fetch a list of image URLs in the folder
      const response = await axios.get(folderUrl);
      const imageUrls = response.data; // Modify this to extract the image URLs from the response

      if (imageUrls.length === 0) {
        alert('No images found in the folder.');
        return;
      }

      const zip = new JSZip();

      // Download and add each image to the zip file
      for (let i = 0; i < imageUrls.length; i++) {
        const imageUrl = imageUrls[i];
        const imageName = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
        const imageBlob = await axios.get(imageUrl, { responseType: 'blob' });

        zip.file(imageName, imageBlob.data);
      }

      // Generate the zip file
      const zipBlob = await zip.generateAsync({ type: 'blob' });

      // Save the zip file
      saveAs(zipBlob, 'images.zip');
    } catch (error) {
      console.error('Error downloading images:', error);
      alert('Error downloading images.');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div>
      <button onClick={handleDownload} disabled={downloading}>
        {downloading ? 'Downloading...' : 'Download All Images'}
      </button>
    </div>
  );
};

export default DownloadButton;
