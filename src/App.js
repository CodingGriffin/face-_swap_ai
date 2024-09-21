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
    setPending(true)
    const fetchImage = async () => {
      try {
        const response = await fetch(imgUrl, {
          method: 'GET',
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        });
        const blob = await response.blob(); // Convert the response to a blob (binary)
        const imageObjectURL = URL.createObjectURL(blob); // Create object URL for the blob
        setimgSrc(imageObjectURL); // Set the image source in state
      } catch (error) {
        console.error("Error fetching image:", error);
      } finally {
        setPending(false)
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
      <img className="min-[500px]:w-16 min-[320px]:w-12 md:w-20 leading-none pb-4" src="/Tron.png" alt="Tron" />
      <div className="min-[500px]:text-[38px] min-[320px]:text-[34px] md:text-[42px] text-white  leading-none pb-1">SUNWUKONG</div>
      <div className="min-[500px]:text-[24px] min-[320px]:text-[20px] md:text-[28px] text-[#AD8D7F] mb-6">PFP GENERATOR</div>
      <div className="min-[500px]:text-[26px] min-[320px]:text-[22px] md:text-[30px] text-white leading-none mb-6">
        <p className="pb-2">YOU CAN NOW TRANSFORM YOUR PROFILE PICTURE</p>
        <p className="pb-1">INTO THE CHINESE LEGEND SUN WUKONG!</p>
      </div>
      <div className="flex flex-row items-center space-x-5 mb-6">
        <div>
          <img className="absolute -ml-5 md:w-20  min-[500px]:w-16 min-[320px]:w-12" src="/wukong.png" />
          <img className=" min-[500px]:w-36 min-[320px]:w-32 md:w-44" src="/main.png" />
        </div>
        <img className="min-[500px]:w-14 min-[320px]:h-12 md:w-16 md:h-14" src="/swap.gif" />
        <div className="flex flex-col items-center relative">
          {!pending ? (
            <>
              <img src={imgSrc ? imgSrc : imgUrl} className=' min-[500px]:w-36 min-[320px]:w-32 md:w-44' />
              <div className="absolute flex flex-col items-center -bottom-8 md:-bottom-5 sm:-bottom-7">
                <button onClick={handleButtonClick}>
                  <img className="min-[500px]:w-28 min-[320px]:w-24 md:w-32 p" src="/upload.png" />
                </button>
                <div className="min-[500px]:text-[6px] min-[320px]:text-[5px] md:text-[8px] text-white font-inter">Max. 2 mb - Format in .jpg or .png</div>
              </div>
            </>
          ) : (
            <p style={{ color: "white " }}>Loading...</p>
          )}

        </div>
      </div>
      <button onClick={handleDownload} >
        <img className="min-[500px]:w-28 min-[320px]:w-24 md:w-32 mb-6 pb-4" src="/download.png" alt="download" />
      </button>
      <div className="min-[500px]:text-[26px] min-[320px]:text-[22px] md:text-[30px] text-[#AD8D7F] leading-none mb-6 ">
        <p className="pb-2">BE PART THE MOVEMENT, CHANGE YOUR PFP ON X,</p>
        <p className="pb-1">JOIN THE FAST-GROWING COMMUNITY aND HAVE a CHANCE TO WIN $250,-</p>
      </div>
      <div className="flex flex-row space-x-5 mb-6">
        <img className="md:w-12 min-[500px]:w-10 min-[320px]:w-8" src="/x.png" />
        <img className="md:w-12 min-[500px]:w-10 min-[320px]:w-8" src="/tel.png" />
      </div>
      <div className="min-[500px]:text-[8px] min-[320px]:text-[6px] md:text-[10px] text-[#AD8D7F] mb-3 font-inter">
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
