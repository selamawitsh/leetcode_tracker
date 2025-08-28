import { BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navbar";
import ProblemList from "./pages/ProblemList";
import AddProblem from "./pages/AddProblem";
import ProblemDetail from "./pages/ProblemDetail";
import DueToday from "./pages/DueToday";
import EditProblem from "./pages/EditProblem";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProblemList />} />
        <Route path="/add" element={<AddProblem />} />
        <Route path="/problem/:id" element={<ProblemDetail />} />
        <Route path="/problem/:id/edit" element={<EditProblem />} />
          <Route path="/due" element={<DueToday />} />
        </Routes>
    </BrowserRouter>
  );
}
