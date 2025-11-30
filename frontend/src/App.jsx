import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import AddGame from "./pages/AddGame";
import Protected from "./Protected"; 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/home"
          element={
            <Protected>
              <Home />
            </Protected>
          }
        />

        <Route
          path="/add-game"
          element={
            <Protected>
              <AddGame />
            </Protected>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
