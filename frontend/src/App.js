import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import Form from "./pages/form";
import Done from "./pages/done";
import Admin from "./pages/admin";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/done" element={<Done />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
