import { useEffect, useState } from "react";
import "../src/app.css";
import * as faceapi from "face-api.js";
import Recommendation from "./components/Recommendation";
import Footer from "./components/Footer";

function App() {
  const [file, setFile] = useState(null);
  const [mood, setMood] = useState("Analyzing...");
  const [confidence, setConfidence] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => detectFace(img);
      img.onerror = () => console.error("Error loading image");
    }
  }, [file]);

  const detectFace = async (imageElement) => {
    try {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
        faceapi.nets.ageGenderNet.loadFromUri("/models")
      ]);

      await imageElement.decode();
      const detections = await faceapi
        .detectAllFaces(imageElement, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions()
        .withAgeAndGender();

      if (detections.length > 0) {
        const emotions = detections[0].expressions;
        const highestEmotion = Object.keys(emotions).reduce((a, b) =>
          emotions[a] > emotions[b] ? a : b
        );

        const confidenceMap = {
          happy: 90,
          neutral: 85,
          sad: 70,
          angry: 65,
          surprised: 75,
          disgusted: 60,
          fearful: 55,
        };

        setMood(highestEmotion);
        setConfidence(confidenceMap[highestEmotion] || 50);
        setGender(detections[0].gender);
      } else {
        setMood("No face detected");
        setConfidence("");
        setGender("");
      }
    } catch (error) {
      console.error("Face detection error:", error);
      setMood("Error detecting face");
      setConfidence("");
      setGender("");
    }
  };

  return (
    <div className="container text-center mt-10">
      <h1 className="text-4xl text-white font-bold mt-10">AI Image Analysis</h1>
      <p className="text-gray-400 mt-5 mb-10 leading-7">
        Upload an image to analyze faces, detect emotions, and get personalized recommendations. 
        <br/>
        {file ?  <span className="text-xs text-pruple-700">It will take 3-4 seconds...</span> : ""}
       
      </p>
      <p></p>
      {/* Image Upload Section */}
      <div className="image-upload border-dashed border-2 rounded-lg w-[600px] h-[400px] mx-auto flex flex-col justify-center items-center relative 
      hover:border-sky-400 duration-200 mb-16
      ">
        {file ? (
          <>
            <img
              src={URL.createObjectURL(file)}
              alt="Uploaded Preview"
              className="max-w-[80%] max-h-[80%] object-contain rounded-xl"
            />
            <label className="text-gray-500 cursor-pointer mt-2">
              Click or drag to replace image
              <input type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
            </label>
          </>
        ) : (
          <label className="text-gray-500 cursor-pointer">
            Click to upload an image
            <input type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
          </label>
        )}
      </div>

      {/* Advanced Mood Card */}
      <div> 
        {file ? (
          <> 
          <div className="mt-10 flex justify-center">
            <div className="bg-gray-800 text-white rounded-3xl shadow-xl p-8 w-96 text-center border border-gray-700 hover:shadow-2xl transition-transform transform hover:scale-105">
              <h3 className="text-xl font-semibold">Detected Mood</h3>
              <h2 className="text-3xl font-bold text-sky-400 mt-2 capitalize">{mood}</h2>
              <p className="text-sm text-gray-300 mt-1">
                Confidence: <span className="font-medium text-gray-400">{confidence}%</span>
              </p>
              <p className="text-sm text-gray-300 mt-1">Gender: {gender}</p>
              {mood !== "Analyzing..." ? <p className="text-lg font-semibold text-green-400 mt-4">Enjoy your mood! 😊</p> : "" }
            </div>
          </div>
          </>
        ) : "" }
      </div>
      
      {file ?  <Recommendation mood={mood}/> : ""}
     
     <Footer/>
    </div>
  );
}

export default App;
