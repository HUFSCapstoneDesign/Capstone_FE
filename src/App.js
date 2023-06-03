import { React, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const Select = lazy(() => import('./page/Select'))
  const EditPage = lazy(() => import('./page/EditPage'))
  const Preview = lazy(() => import('./page/Preview'))
  return (
    <BrowserRouter>
      <Suspense fallback={<div>loading</div>}>
        <Routes>
          <Route path="/select" element={<Select />} />
          <Route path="/edit" element={<EditPage />} />
          <Route path="/preview" element={<Preview />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
