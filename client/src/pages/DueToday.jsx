import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import "@fontsource/inter"; // make sure to install via: npm install @fontsource/inter

export default function DueToday() {
  const [dueProblems, setDueProblems] = useState([]);

  useEffect(() => {
    API.get("/due/today").then((res) => setDueProblems(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-8 font-sans">
      <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 mb-6 font-inter">
        Problems Due Today
      </h1>

      {dueProblems.length === 0 && (
        <p className="text-gray-400 text-lg animate-pulse font-inter">
          No problems due today
        </p>
      )}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {dueProblems.map((p) => (
          <Link
            key={p._id}
            to={`/problem/${p._id}`}
            className="flex flex-col justify-between bg-[#1f2033] p-4 rounded-2xl shadow-2xl hover:shadow-lg transition transform hover:-translate-y-1 hover:scale-105 border border-gray-700 font-inter"
          >
            <h2 className="text-xl font-bold text-white mb-2">{p.title}</h2>
            <p className="text-gray-400 mb-1">
              Difficulty:{" "}
              <span
                className={`${
                  p.difficulty === "Easy"
                    ? "text-green-400"
                    : p.difficulty === "Medium"
                    ? "text-yellow-400"
                    : "text-red-400"
                } font-semibold`}
              >
                {p.difficulty}
              </span>
            </p>
            <p className="text-gray-400">
              Last Result:{" "}
              <span
                className={`${
                  p.attempts.at(-1)?.result === "AC"
                    ? "text-green-400"
                    : p.attempts.at(-1)?.result === "WA"
                    ? "text-red-400"
                    : "text-yellow-400"
                } font-semibold`}
              >
                {p.attempts.at(-1)?.result || "N/A"}
              </span>
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
