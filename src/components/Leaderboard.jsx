import { useState, useEffect } from "react";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  // Load leaderboard from localStorage when component mounts
  useEffect(() => {
    const updateLeaderboard = () => {
      const storedLeaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
      setLeaderboard(storedLeaderboard);
    };

    updateLeaderboard(); // Initial load

    // Listen for updates when localStorage changes
    window.addEventListener("storage", updateLeaderboard);

    return () => window.removeEventListener("storage", updateLeaderboard);
  }, []);

  return (
    <div className="p-2 bg-gray-100 dark:bg-secondary rounded-lg shadow-md text-white">
      <h2 
        className="text-xl font-semibold text-center mb-4 dark:text-white" 
        title="View the top scores of players"
      >
        🏆 Leaderboard
      </h2>
      {leaderboard.length > 0 ? (
        <table className="w-full border-collapse" title="Sorted by highest scores">
          <thead>
            <tr className="bg-[#ffb300] text-white">
              <th className="py-2 px-4" title="Player rank based on score">Rank</th>
              <th className="py-2 px-4" title="Name of the player">Name</th>
              <th className="py-2 px-4" title="Total score achieved">Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr
                key={index}
                className={`border-t ${index % 2 === 0 ? "bg-gray-200 dark:bg-gray-700" : "bg-gray-300 dark:bg-gray-600"}`}
                title={`Rank ${index + 1}: ${entry.name} scored ${entry.score} points`}
              >
                <td className="py-2 px-4 text-center font-bold">{index + 1}</td>
                <td className="py-2 px-4 text-center">{entry.name}</td>
                <td className="py-2 px-4 text-center font-semibold">{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p 
          className="text-center text-gray-600 dark:text-gray-300" 
          title="No scores available yet. Play a quiz to get ranked!"
        >
          No scores yet! Start a quiz to get ranked.
        </p>
      )}
    </div>
  );
}
