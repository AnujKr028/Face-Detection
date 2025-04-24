# Mood Detection 🎭🎶📚

A real-time AI-powered web app that detects your facial expression and recommends a **movie**, **song**, and **book** based on your current mood.

🌐 Live: [mooddetection.vercel.app](https://mooddetection.vercel.app/)  
📦 GitHub: [github.com/AnujKr028/Mood-Detection](https://github.com/AnujKr028/Mood-Detection)

---

## 🚀 Features

- 📸 Detects mood using your webcam and face expression models
- 🎬 Suggests a movie
- 🎧 Suggests a song
- 📖 Suggests a book
- 🔮 Uses AI (Cohere API) to generate personalized suggestions
- 💻 Built with React + face-api.js

---

## 🧠 Machine Learning Models Used

- `tiny_face_detector`
- `face_expression_model`
- `face_landmark_68_model`
- `age_gender_model`

All models are integrated using **face-api.js** and are stored locally for fast client-side predictions.

---

## 🛠️ Tech Stack

- **Frontend**: React, Tailwind CSS
- **AI Integration**: Cohere API (for generating recommendations)
- **ML Models**: face-api.js (TensorFlow models)
- **Deployment**: Vercel

---

## 📸 How It Works

1. Allow webcam access(yet to integrate) , you can upload yours photo
2. Your facial expression is detected in real time
3. Based on mood (happy, sad, angry, etc.), the app sends a prompt to an AI API
4. AI responds with personalized content
5. Click the links to explore music, movies, and books tailored to your mood

---

## 📷 Screenshots

![Screenshot 2025-04-24 114304](https://github.com/user-attachments/assets/dd075442-b1f9-4709-b647-b49a47273ec5)

## 📁 Setup Locally

```bash
git clone https://github.com/AnujKr028/Mood-Detection.git
cd Mood-Detection
npm install
npm start



