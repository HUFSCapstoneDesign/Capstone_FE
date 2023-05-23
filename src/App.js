import { React } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Select from "./page/Select";
import EditPage from "./page/EditPage";
import Preview from "./page/Preview";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/select" element={<Select />} />
        <Route path="/edit" element={<EditPage />} />
        <Route path="/preview" element={<Preview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
