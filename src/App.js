import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { showUser } from "./features/userDetailSlice";
import { useDispatch } from "react-redux";
import Navbar from "./components/Navbar";
import Read from "./components/Read";
import Create from "./components/Create";
import Update from "./components/Update";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(showUser());
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Read />} />
          <Route exact path="/create" element={<Create />} />
          <Route exact path="/edit/:id" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
