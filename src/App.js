import { useEffect, useState, useRef } from "react";
import Navbar from "../src/components/Navbar";
import NewPost from "../src/components/NewPosts";
import "../src/app.css";
import * as faceapi from "face-api.js";

function App() {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [mood, setMood] = useState("Analyzing...");

  useEffect(() => {
    if (file) {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setImage({ url: img.src, width: img.width, height: img.height });
        detectFace(img);
      };
      img.onerror = () => console.error("Error loading image");
    }
  }, [file]);

  const detectFace = async (imageElement) => {
    try {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
      ]);

      await imageElement.decode();
      const detections = await faceapi
        .detectAllFaces(imageElement, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions();

      if (detections.length > 0) {
        const emotions = detections[0].expressions;
        const highestEmotion = Object.keys(emotions).reduce((a, b) =>
          emotions[a] > emotions[b] ? a : b
        );
        setMood(highestEmotion);
      } else {
        setMood("No face detected");
      }
    } catch (error) {
      console.error("Face detection error:", error);
      setMood("Error detecting face");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="fixed-container">
        <div className="upload_photo">
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        {image && <NewPost image={image} />}
        <p>Mood: {mood}</p>
      </div>
    </div>
  );
}

export default App;
