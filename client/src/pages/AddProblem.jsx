import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "@fontsource/inter"; // Import Inter font

export default function AddProblem() {
  const [form, setForm] = useState({
    title: "",
    url: "",
    pattern: "",
    difficulty: "E",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post("/", form);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center p-8 font-Oswald">
      <div className="w-full max-w-lg bg-[#1f2033] rounded-3xl shadow-2xl p-8 animate-fadeIn">
        {/* Header */}
        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 mb-6 text-center font-Oswald">
          Add New Problem
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="p-3 rounded-xl border border-gray-600 bg-[#2b2d46] text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <input
            name="url"
            placeholder="URL"
            value={form.url}
            onChange={handleChange}
            className="p-3 rounded-xl border border-gray-600 bg-[#2b2d46] text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <input
            name="pattern"
            placeholder="Pattern"
            value={form.pattern}
            onChange={handleChange}
            className="p-3 rounded-xl border border-gray-600 bg-[#2b2d46] text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <select
            name="difficulty"
            value={form.difficulty}
            onChange={handleChange}
            className="p-3 rounded-xl border border-gray-600 bg-[#2b2d46] text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          >
            <option value="E">Easy</option>
            <option value="M">Medium</option>
            <option value="H">Hard</option>
          </select>

          <button
            type="submit"
            className="bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 hover:from-pink-500 hover:via-orange-500 hover:to-yellow-400 text-white font-semibold p-3 rounded-xl shadow-lg transition transform hover:-translate-y-1 hover:scale-105 font-roboto"
          >
            Save Problem
          </button>
        </form>
      </div>
    </div>
  );
}
