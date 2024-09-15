import React, { useState, useEffect } from "react";
import "./styles/globals.css";
const App = () => {
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
          <img className="absolute -ml-5 w-20" src = "/wukong.png"/>
          <img className="w-32" src = "/main.png" />
        </div>
        <img className="w-10 h-10" src="/swap.gif" />
        <div className="flex flex-col items-center static relative">
          <img className="w-32" src="/main.png" />
          <div className="absolute flex flex-col items-center -bottom-5">
            <button>
              <img className=" w-24" src = "/upload.png"/>
            </button>
            <div className="text-white text-[8px]">Max. 2 mb - Format in .jpg or .png</div>
          </div>
        </div>
      </div>
      <button>
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
    </div>
  );
};

export default App;
