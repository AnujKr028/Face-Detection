import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js"; 



const NewPosts = ({ image }) => {
  const { url } = image;


  const [faces, setFaces] = useState([]);
  const [moods, setMoods] = useState([]);
  const[genders , setGenders] = useState([]) ;  



  const imgRef = useRef(null);
  const canvasRef = useRef(null);



  
  const handleImage = async () => {
    if (!imgRef.current) return;

    try {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
        faceapi.nets.ageGenderNet.loadFromUri("/models"),
    ]);




      const detections = await faceapi
        .detectAllFaces(imgRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceExpressions()
        .withAgeAndGender() ;



//update states for face mood and genders
      setFaces(detections.map((d) => d.detection.box));
    
    
      setMoods(detections.map((d) => {
        const expressions = d.expressions;
        return Object.keys(expressions).reduce((a, b) =>
          expressions[a] > expressions[b] ? a : b
        );
    }));


        setGenders(detections.map((d) => d.gender)) ;

  
    } catch (error) {
      console.error("Error detecting faces:", error);
    }
  };

  const drawFaceBoxes = () => {
    if (!canvasRef.current || !imgRef.current || faces.length === 0) return;

    const img = imgRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Ensure the canvas matches the fixed image size
    canvas.width = img.width;
    canvas.height = img.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "yellow";
    ctx.fillStyle = "yellow";
    ctx.font = "16px Arial";

    const scaleX = img.width / img.naturalWidth;
    const scaleY = img.height / img.naturalHeight;

    faces.forEach((face, index) => {
      const { x, y, width, height } = face;

      const scaledX = x * scaleX;
      const scaledY = y * scaleY;
      const scaledW = width * scaleX;
      const scaledH = height * scaleY;

      ctx.strokeRect(scaledX, scaledY, scaledW, scaledH);
      ctx.fillText(moods[index] || "Unknown", scaledX, scaledY - 10);
      ctx.fillText(genders[index] || "Unknown", scaledX , scaledY - 25)
    



      // Draw emoji based on the mood
    const emoji = moods[index] === "happy" ? "🙂" :
    moods[index] === "sad" ? "🙁" :
    moods[index] === "angry" ? "😡" :
    moods[index] === "surprised" ? "😲" :
    moods[index] === "neutral" ? "😐" : "🤔";


    // ctx.fillText(emoji, scaledX + 30, scaledY + 10);
    
    });
  };

  useEffect(() => {
    handleImage();
  }, [image]);

  useEffect(() => {
    if (faces.length > 0 && genders.length > 0) {
      drawFaceBoxes();
    }
  }, [faces , moods ,  genders]);

  return (
    <div
      style={{
        position: "relative",
        width: "500px", // Fixed container width
        height: "auto",
        maxWidth: "100%",
        display: "inline-block",
      }}
    >
      {/* Image with fixed size */}
      <img
        ref={imgRef}
        src={url}
        alt="Uploaded"
        onLoad={handleImage}
        style={{
          width: "100%", // Ensures it stays inside the container
          height: "auto",
          display: "block",
          objectFit: "contain", // Prevents image distortion
        }}
      />
      {/* Canvas Overlay */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />




<div className="emoji-analysis">
  {moods.map((mood, index) => {
    // Map moods to emojis
    const emoji = mood === "happy" ? "🙂" :
                  mood === "sad" ? "🙁" :
                  mood === "angry" ? "😡" :
                  mood === "surprised" ? "😲" :
                  mood === "neutral" ? "😐" : "🤔";
    return (
      <div key={index} 
      className="emoji-content"
      >
       <p>emoji suited : {emoji} </p>  
      </div>
    );
  })}
</div> 


    </div>
  );
};

export default NewPosts;
