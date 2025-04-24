import { useState, useEffect } from "react";
import axios from "axios";

const Recommendation = ({ mood }) => {
  const [song, setSong] = useState("No Song Found");
  const [movie, setMovie] = useState("No Movie Found");
  const [book, setBook] = useState("No Book Found");

  const apiKey = process.env.REACT_APP_COHERE_API_KEY;

  const getCohereSuggestions = async (mood) => {
    try {
      const response = await axios.post(
        "https://api.cohere.ai/v1/generate",
        {
          model: "command",
          prompt: `Suggest one song, one movie, and one book for someone feeling ${mood}. Return them in the format:
Song: <song_name>
Movie: <movie_name>
Book: <book_name>`,
          max_tokens: 100,
          temperature: 0.8,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      const text = response.data.generations[0]?.text || "";
      console.log("Cohere response:", text); // 👀 See what’s coming back

      // Extract song/movie/book with better matching
      const matchLine = (label) => {
        const regex = new RegExp(`${label}:\\s*(.*)`, "i");
        const match = text.match(regex);
        return match ? match[1].trim() : null;
      };

      const extractedSong = matchLine("Song");
      const extractedMovie = matchLine("Movie");
      const extractedBook = matchLine("Book");

      setSong(extractedSong || "No Song Found");
      setMovie(extractedMovie || "No Movie Found");
      setBook(extractedBook || "No Book Found");
    } catch (error) {
      console.error("Cohere API error:", error);
    }
  };

  useEffect(() => {
    if (mood) {
      getCohereSuggestions(mood);
    }
  }, [mood]);

  return (
    <div className="container">
      <div className="text-white mt-10">
        <h1 className="text-center text-purple-500 text-4xl font-extrabold tracking-wide">
          Recommendations
        </h1>
      </div>

      <div className="flex flex-row justify-evenly mt-10 mb-10 flex-wrap gap-4">
        {/* 🎵 Music Card */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-64 hover:scale-105 transition transform duration-300">
          <p className="text-sm text-gray-400 font-semibold tracking-wider uppercase mb-4">
            Music
          </p>
          <p className="text-lg font-semibold text-white">{song}</p>
          <a
            href={`https://open.spotify.com/search/${encodeURIComponent(song)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 font-bold text-sm hover:underline hover:text-blue-700"
          >
            🎧 Go Listen!
          </a>
        </div>

        {/* 🎬 Movie Card */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-64 hover:scale-105 transition transform duration-300">
          <p className="text-sm text-gray-400 font-semibold tracking-wider uppercase mb-4">
            Movie
          </p>
          <p className="text-lg font-semibold text-white">{movie}</p>
          <a
            href={`https://www.justwatch.com/in/search?q=${encodeURIComponent(movie)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 font-bold text-sm hover:underline hover:text-blue-700"
          >
            🎬 Go Watch!
          </a>
        </div>

        {/* 📚 Book Card */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-64 hover:scale-105 transition transform duration-300">
          <p className="text-sm text-gray-400 font-semibold tracking-wider uppercase mb-4">
            Book
          </p>
          <p className="text-lg font-semibold text-white">{book}</p>
          <a
            href={`https://www.goodreads.com/search?q=${encodeURIComponent(book)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 font-bold text-sm hover:underline hover:text-blue-700"
          >
            📖 Go Read!
          </a>
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
