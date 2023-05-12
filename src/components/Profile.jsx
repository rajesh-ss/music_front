import React, { useState } from "react";
import Webcam from "react-webcam";
import axios from "axios";

const videoConstraints = {
  width: 400,
  height: 400,
  facingMode: "user",
};
const Profile = () => {
  const [picture, setPicture] = useState("");
  const webcamRef = React.useRef(null);
  // const [file, setFile] = useState(null);

  const capture = () => {
    const pictureSrc = webcamRef.current.getScreenshot();
    setPicture(pictureSrc);

    console.log(picture);
  };

  const handleUpload = (event) => {
    event.preventDefault();
    const reader = new FileReader();
    const binaryString = atob(picture.split(',')[1]);
    const mimeString = picture.split(',')[0].split(':')[1].split(';')[0];
    const blob = new Blob([binaryString], { type: mimeString });
    const gg = new Blob([new Uint8Array(picture.length).map((_, i) => picture.charCodeAt(i))], { type: mimeString });

    const file = new File([gg], "working.png", { type: mimeString });
    const formData = new FormData();
    formData.append('image', file);
    async function dem() {
      await axios
        .post("http://127.0.0.1:5000/getImg", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST",
            "Access-Control-Allow-Headers": "Content-Type",
          },
        })
        .then((response) => {
          console.log(response);
        })
        .then((err) => console.log(err));
    }
    dem();
  };

  return (
    <div>
      <h2 className="mb-5 text-center">
        React Photo Capture using Webcam Examle
      </h2>
      <button onClick={handleUpload}>Play on my mood</button>
      <div>
        <Webcam
          audio={false}
          height={400}
          ref={webcamRef}
          width={400}
          screenshotFormat="image/png"
          videoConstraints={videoConstraints}
        />
      </div>
      <div>
        <button
          onClick={(e) => {
            e.preventDefault();
            capture();
          }}
          className="btn btn-danger"
        >
          Capture
        </button>
        <img src={picture} />
      </div>
    </div>
  );
};
export default Profile;
