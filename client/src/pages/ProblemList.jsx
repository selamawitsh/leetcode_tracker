import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";

export default function ProblemList() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    API.get("/").then((res) => setProblems(res.data));
  }, []);

  // helper to color difficulty like LeetCode
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-400";
      case "Medium":
        return "text-yellow-400";
      case "Hard":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-gray-200 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Problem List Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((p) => (
            <Link
              key={p._id}
              to={`/problem/${p._id}`}
              className="group bg-[#1e1f2f] border border-gray-700 rounded-2xl p-6 flex flex-col justify-between shadow-lg transform hover:-translate-y-2 hover:scale-105 hover:shadow-2xl transition duration-300"
            >
              {/* Title */}
              <h2 className="text-xl font-semibold text-blue-400 group-hover:text-blue-300 transition">
                {p.title}
              </h2>

              {/* Difficulty */}
              <p className={`mt-3 font-medium ${getDifficultyColor(p.difficulty)}`}>
                Difficulty: {p.difficulty}
              </p>

              {/* Result Badge */}
              <div className="mt-4">
                {p.attempts.length > 0 ? (
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      p.attempts.at(-1)?.result === "AC"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {p.attempts.at(-1)?.result}
                  </span>
                ) : (
                  <span className="px-3 py-1 text-sm rounded-full bg-gray-500/20 text-gray-400">
                    Unsolved
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
