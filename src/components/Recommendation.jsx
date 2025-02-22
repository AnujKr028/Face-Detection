import { useState, useEffect } from "react";



const Recommendation = ({ mood }) => {
  const [songs, setSongs] = useState([]);
  const [movies, setMovies] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch songs
    fetch("./Music.json")
      .then((res) => res.json())
      .then((data) => {
        console.log("Music data:", data);
        console.log("Songs for mood:", data[mood]); 
        setSongs(data[mood] || []);
      });

    // Fetch movies
    fetch("./Movies.json")
      .then((res) => res.json())
      .then((data) => setMovies(data[mood] || []));

    // Fetch books
    fetch("./Books.json")
      .then((res) => res.json())
      .then((data) => setBooks(data[mood] || []));
  }, [mood]); // Re-fetch data when mood changes

  return (
    <div className="container">
      <div className="text-white mt-10">
        <h1 className="text-center text-purple-500 mt text-4xl font-extrabold tracking-wide">
          Recommendations
        </h1>
      </div>

      <div className="flex flex-row justify-evenly mt-10 mb-10">
        {/* 🎵 Music Card */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-64 hover:scale-105 transition transform duration-300">
          <p className="text-sm text-gray-400 font-semibold tracking-wider uppercase mb-4">
            Music
          </p>
          <p className="text-lg font-semibold text-white">{songs[0] || "No Song Found"}</p>
          <a 
            href="https://www.spotify.com" 
            target="_blank" 
            rel="noopener noreferrer"
          className="text-blue-500 font-bold text-sm text-left hover:underline hover:text-blue-700">
            🎧 Go Listen!
        
          </a>
          
        </div>

        {/* 🎬 Movie Card */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-64 hover:scale-105 transition transform duration-300">
          <p className="text-sm text-gray-400 font-semibold tracking-wider uppercase mb-4">
            Movie
          </p>
          <p className="text-lg font-semibold text-white">{movies[0] || "No Movie Found"}</p>
          <a 
          
            href="https://www.justwatch.com/in/movie/forrest-gump"
             target="_blank" 
            rel="noopener noreferrer"

          className="text-blue-500 font-bold text-sm text-left hover:underline hover:text-blue-700">
            🎬 Go Watch!
          </a>
        </div>

        {/* 📚 Book Card */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-64 hover:scale-105 transition transform duration-300">
          <p className="text-sm text-gray-400 font-semibold tracking-wider uppercase mb-4">
            Book
          </p>
          <p className="text-lg font-semibold text-white">{books[0] || "No Book Found"}</p>
          <a 
          href="https://www.goodreads.com"
          target="_blank" 
          rel="noopener noreferrer"

          className="text-blue-500 font-bold text-sm text-left hover:underline hover:text-blue-700">
            📖 Go Read!
          </a>
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
