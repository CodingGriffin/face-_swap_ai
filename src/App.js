import React, { useState, useRef, useEffect } from "react";
import "./styles/globals.css";

const api = "https://ebed-188-43-136-44.ngrok-free.app"

const App = () => {
  const [imgSrc, setimgSrc] = useState("")
  const [imgUrl, setimgUrl] = useState("/main.png")
  const [pending, setPending] = useState(false)
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Fetch the image from FastAPI backend
    const fetchImage = async () => {
      try {
        const response = await fetch(imgUrl);
        const blob = await response.blob(); // Convert the response to a blob (binary)
        const imageObjectURL = URL.createObjectURL(blob); // Create object URL for the blob
        setimgSrc(imageObjectURL); // Set the image source in state
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [imgUrl]);  // Fetch image when the imgUrl changes

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  // Handle file selection
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      alert('Please select a file first!');
      return;
    }
    const formData = new FormData();
    formData.append('avatar', file);
    setPending(true)
    try {
      const response = await fetch(`${api}/face-swap`, {
        method: 'POST',
        headers: {
          'ngrok-skip-browser-warning': 'true'
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('File uploaded successfully!');
      console.log('Response:', result);
      if (result.result === "result_uploads/SUNWUKONG.png") {
        alert("There's no face in your avatar.. ?")
        return;
      }
      setimgUrl(`${api}/${result.result}`)
    } catch (error) {
      console.log('Failed to upload file.');
      console.error('Error:', error);
    } finally {
      setPending(false)
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(imgUrl, {
        method: 'GET',
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      });

      if (!response.ok) {
        throw new Error(`Error fetching image: ${response.statusText}`);
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', 'sunwukongish-avatar.jpg');
      document.body.appendChild(link);
      link.click();

      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

    } catch (error) {
      console.error('Error downloading the image:', error);
    }
  };
  return (
    <div className="w-full h-[100vh] text-center justify-center items-center flex flex-col p-6">
      <img className="w-20 leading-none" src="/Tron.png" alt="Tron" />
      <div className="text-white text-[30px] leading-none">SUNWUKONG</div>
      <div className="text-[18px] text-[#AD8D7F] mb-3">PFP GENERATOR</div>
      <div className="text-white text-[30px] leading-none mb-6">
        YOU CAN TRANSFORM YOUR PROFILE PICTURE
        <br />
        INTO THE CHINESE SUN WUKONG!
      </div>
      <div className="flex flex-row items-center space-x-5 mb-6">
        <div>
          <img className="absolute -ml-5 w-20" src="/wukong.png" />
          <img className="w-32" src="/main.png" />
        </div>
        <img className="w-10 h-10" src="/swap.gif" />
        <div className="flex flex-col items-center relative">
          {!pending ? (
            <>
              <img src={imgSrc ? imgSrc : imgUrl} alt="Streamed from FastAPI" className='w-32' />
              <div className="absolute flex flex-col items-center -bottom-5">
                <button onClick={handleButtonClick}>
                  <img className="w-24" src="/upload.png" />
                </button>
                <div className="text-white text-[8px]">Max. 2 mb - Format in .jpg or .png</div>
              </div>
            </>
          ) : (
            <p style={{ color: "white " }}>Loading...</p>
          )}

        </div>
      </div>
      <button onClick={handleDownload} >
        <img className="w-24 mb-6" src="/download.png" alt="download" />
      </button>
      <div className="text-[30px] text-[#AD8D7F] leading-none mb-6 ">
        BE PART THE MOVEMENT, CHANGE YOUR PFP ON X, <br /> JOIN THE FAST-GROWING
        COMMUNITY AND HAVE a CHANCE TO WIN $250,-
      </div>
      <div className="flex flex-row space-x-5 mb-6">
        <img className="w-16" src="/x.png" />
        <img className="w-16" src="/tel.png" />
      </div>
      <div className="text-[10px] text-[#AD8D7F] mb-3">
        THIS WEBSITE IS NOT RELATED OFFICIALLLY TO THE BLACK MYTH - WUKONG GAME,
        <br />
        POWERED BY THE SUN WUKONG COMMUNITY ON TRON,
        <br />
        CA:TP3PRCVQKNVTHRVNN281CKST56EWILGJJM
      </div>
      <input
        type="file"
        name="avatar"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default App;
