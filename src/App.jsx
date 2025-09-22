import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const localQuotes = [
  "Believe in yourself and all that you are.",
  "Every day is a second chance.",
  "Push yourself, because no one else will do it for you.",
  "Dream it. Wish it. Do it.",
  "Stay positive, work hard, make it happen."
];

export default function App() {
  const [quote, setQuote] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);

  useEffect(() => {
    fetch("https://type.fit/api/quotes")
      .then(res => res.json())
      .then(data => {
        const random = data[Math.floor(Math.random() * data.length)];
        setQuote(random.text);
      })
      .catch(() => {
        setQuote(localQuotes[Math.floor(Math.random() * localQuotes.length)]);
      });
  }, []);

  const newQuote = () => {
    setQuote(localQuotes[Math.floor(Math.random() * localQuotes.length)]);
    new Audio("https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg").play();
  };

  const saveFavorite = () => {
    if (!favorites.includes(quote)) {
      setFavorites([...favorites, quote]);
      localStorage.setItem("favorites", JSON.stringify([...favorites, quote]));
    }
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-cover bg-center"
           style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?nature,sky')" }}>
        
        {showOnboarding && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center max-w-sm">
              <h2 className="text-xl font-bold mb-4">Welcome!</h2>
              <p className="mb-4">Get inspired daily with quotes. Tap buttons to save favorites or fetch a new one.</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setShowOnboarding(false)}>Got it</button>
            </div>
          </div>
        )}

        <motion.div
          key={quote}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/70 dark:bg-gray-800/70 p-6 rounded-xl shadow-lg max-w-xl text-center"
        >
          <h1 className="text-2xl font-bold mb-4">✨ Daily Motivation ✨</h1>
          <p className="text-lg italic mb-4">"{quote}"</p>

          <div className="flex gap-4 justify-center">
            <button onClick={newQuote} className="bg-green-600 text-white px-4 py-2 rounded-lg shadow">
              New Quote
            </button>
            <button onClick={saveFavorite} className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow">
              Save
            </button>
            <button onClick={() => setDarkMode(!darkMode)} className="bg-gray-700 text-white px-4 py-2 rounded-lg shadow">
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>

          {favorites.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold mb-2">⭐ Favorites</h2>
              <ul className="space-y-2 text-sm max-h-40 overflow-y-auto">
                {favorites.map((f, i) => (
                  <li key={i}>"{f}"</li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}