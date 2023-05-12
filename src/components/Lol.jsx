import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import "./sty.css";
import base64js from "base64-js";
import { useEffect } from "react";
import hap from "../assets/honor-and-sword-main-11222.mp3";
import happ from "../assets/Happy.mp3";
import Ang from "../assets/Angry.mp3";
import fear from "../assets/fearless.mp3";
import nue from "../assets/nuetral.mp3";
import sad from "../assets/Sad.mp3";
import surprise from "../assets/surprise.mp3";

const videoConstraints = {
  width: 300,
  height: 300,
  facingMode: "user",
};
const Lol = () => {
  const [picture, setPicture] = useState("");
  const webcamRef = React.useRef(null);
  const [emotion, setEmotion] = useState();
  const [audio, setAudio] = useState(null);
  const [base, setBase] = useState("");
  // const [file, setFile] = useState(null);

  const findSong = () => {
    console.log("emotions changed");
    if (emotion === "Happy") {
      console.log("happy inside");
      setAudio(happ);
    } else if (emotion === "Fearful") {
      console.log("Fearful");
      setAudio(fear);
    } else if (emotion === "Neutral") {
      console.log("Neutral");
      setAudio(nue);
    } else if (emotion === "Sad") {
      console.log("Sade");
      setAudio(sad);
    } else if (emotion === "Surprised") {
      console.log("Surprised");
      setAudio(surprise);
    }
  };

  const audioRef = useRef(null);

  function handlePlay() {
    audioRef.current.play();
  }

  function handlePause() {
    audioRef.current.pause();
  }

  const capture = () => {
    const pictureSrc = webcamRef.current.getScreenshot();
    // console.log(pictureSrc)
    setPicture(pictureSrc);

    // console.log(picture);
  };

  const getSong = (event) => {
    event.preventDefault();
    async function ss() {
      await axios
        .get("http://127.0.0.1:5000/song")
        .then((response) => {
          console.log(response);
          setBase(response.data);

          // if(gg){
          //   const binaryData = base64js.toByteArray((response.data).toString().split(',')[1]);
          //   const blob = new Blob([binaryData], { type: 'audio/mp3' });
          //   setAudio(URL.createObjectURL(blob));
          //  // console.log(emotion)
          // }
          // else{
          //   throw new Error;
          // }
        })
        .then((err) => console.log(err));
    }
    ss();
  };

  const handleUpload = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", picture);
    async function dem() {
      await axios
        .post("http://127.0.0.1:5000/image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        })
        .then((response) => {
          console.log(response);
          setEmotion(response["data"]);
          console.log(emotion);
        })
        .then((err) => console.log(err));
    }
    dem();
  };

  console.log(audio);
  return (
    <div
      className="w-100 h-100 d-flex flex-column justify-content-center align-items-center p-0"
      style={{ border: "0px solid black", padding:"0px" }}
    >
      <h1 className="mb-5 text-center">Emotion Based Music player</h1>
      <div 
      className="w-25 d-flex flex-column justify-content-center align-items-center"
      style={{ border: "2px solid black", padding:"10px", borderRadius:"10px", minWidth:"450px" }}>

      
      
      <h2>You are {emotion}</h2>

      <div>
        <Webcam
          audio={false}
          height={300}
          
          ref={webcamRef}
          width={300}
          screenshotFormat="image/png"
          videoConstraints={videoConstraints}
          // style={{border: "5px solid black"}}
        />
      </div>
      <div style={{border: "1px solid black", borderRadius: "10px", margin:"10px", minWidth: "350px", display:"flex", justifyContent: "space-around"}}>
        <button
          onClick={(e) => {
            e.preventDefault();
            capture();
          }}
          className="btn btn-danger mt-3"
          style={{width:"100px", height: "40px"}}
        >Capture</button>
        <button 
        className="btn btn-primary my-3" 
        style={{width:"200px", height: "40px"}}
        onClick={handleUpload}>
        send my image
      </button>

        {/* <img src={picture} /> */}
      </div>
  
      {/* <audio  controls >
        <source src={audio} type="audio/mp3"/>
        </audio> */}
      <div style={{border: "1px solid black", borderRadius: "10px", padding:"10px 0px",margin:"10px", minWidth: "350px", display:"flex", justifyContent: "space-around", flexDirection:"column", alignItems:"center"}}>
        <p style={{borderBottom:"1px solid black"}}>{`playing.... ${emotion} song for you`}</p>
        <audio src={audio} ref={audioRef} controls style={{color: "red"}}/>
        <div>
          <button style={{border: "1px solid black",margin:"10px", backgroundColor: "#40bf40"}} onClick={handlePlay}>Play {" |>"}</button>
          <button style={{border: "1px solid black",margin:"10px", backgroundColor: "#ff3300"}} onClick={handlePause}>Pause {"||"}</button>
        </div>
      </div>

      <button className="btn btn-primary " onClick={findSong}>
        {/* // onClick={getSong}> */}
       {"<-- ("} get Song {")  -->"}
      </button>
      </div>
    </div>
  );
};
export default Lol;
