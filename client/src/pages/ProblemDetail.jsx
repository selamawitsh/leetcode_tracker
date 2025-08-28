import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { FaExternalLinkAlt } from "react-icons/fa";

export default function ProblemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [problem, setProblem] = useState(null);
  const [result, setResult] = useState("AC");

  useEffect(() => {
    API.get(`/${id}`).then((res) => setProblem(res.data));
  }, [id]);

  const addAttempt = async () => {
    await API.post(`/${id}/attempts`, { result });
    const updated = await API.get(`/${id}`);
    setProblem(updated.data);
  };

  const deleteProblem = async () => {
    if (window.confirm("Are you sure you want to delete this problem?")) {
      await API.delete(`/${id}`);
      navigate("/");
    }
  };

  if (!problem)
    return (
      <p className="text-gray-400 text-center mt-20 text-lg animate-pulse">
        Loading...
      </p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-gray-200 p-8">
      <div className="max-w-4xl mx-auto bg-[#1f2033] border border-gray-700 rounded-3xl shadow-2xl p-8 animate-fadeIn">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 mb-4">
          {problem.title}
        </h1>

        {/* Problem Link */}
        <a
          href={problem.url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium mb-6"
        >
          Open Problem <FaExternalLinkAlt />
        </a>

        {/* Problem Info */}
        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          <p className="text-lg">
            <span className="font-semibold">Difficulty:</span>{" "}
            <span
              className={`${
                problem.difficulty === "E"
                  ? "text-green-400"
                  : problem.difficulty === "M"
                  ? "text-yellow-400"
                  : "text-red-400"
              } font-semibold`}
            >
              {problem.difficulty}
            </span>
          </p>
          <p className="text-lg">
            <span className="font-semibold">Next Review:</span>{" "}
            {problem.nextReviewDate
              ? new Date(problem.nextReviewDate).toDateString()
              : "Not set"}
          </p>
          <p className="text-lg col-span-2">
            <span className="font-semibold">Last Result:</span>{" "}
            <span
              className={`${
                problem.attempts.at(-1)?.result === "AC"
                  ? "text-green-400"
                  : problem.attempts.at(-1)?.result === "WA"
                  ? "text-red-400"
                  : "text-yellow-400"
              } font-semibold`}
            >
              {problem.attempts.at(-1)?.result || "N/A"}
            </span>
          </p>
        </div>

        {/* Attempts */}
        <h2 className="text-2xl font-bold text-gray-100 mb-4">Attempts</h2>
        <ul className="space-y-3 mb-6">
          {problem.attempts.map((a) => (
            <li
              key={a.attemptNumber}
              className="flex justify-between items-center bg-[#2b2d46] p-4 rounded-xl border border-gray-700 shadow hover:shadow-lg transition"
            >
              <div>
                <span className="font-semibold">Attempt #{a.attemptNumber}</span>{" "}
                -{" "}
                <span
                  className={`${
                    a.result === "AC"
                      ? "text-green-400"
                      : a.result === "WA"
                      ? "text-red-400"
                      : "text-yellow-400"
                  } font-medium`}
                >
                  {a.result}
                </span>
              </div>
              <span className="text-gray-400 text-sm">
                {new Date(a.date).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>

        {/* Controls */}
        <div className="flex flex-wrap gap-4">
          <select
            value={result}
            onChange={(e) => setResult(e.target.value)}
            className="border border-gray-600 bg-[#1f2033] text-gray-200 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="AC">AC</option>
            <option value="WA">WA</option>
            <option value="TLE">TLE</option>
            <option value="RE">RE</option>
            <option value="PARTIAL">PARTIAL</option>
          </select>

          <button
            onClick={addAttempt}
            className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-xl shadow-md text-white font-semibold transition transform hover:-translate-y-1 hover:scale-105"
          >
            Add Attempt
          </button>

          <Link
            to={`/problem/${id}/edit`}
            className="bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded-xl shadow-md text-white font-semibold transition transform hover:-translate-y-1 hover:scale-105"
          >
            Edit
          </Link>

          <button
            onClick={deleteProblem}
            className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl shadow-md text-white font-semibold transition transform hover:-translate-y-1 hover:scale-105"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
