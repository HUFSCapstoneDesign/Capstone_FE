import {React, useState, useRef} from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Select from "./page/Select";
import EditPage from "./page/EditPage";

function App() {
  
  return (
      <BrowserRouter>
        <Routes>
            <Route path = '/select' element = {<Select/>}/>
            <Route path = '/edit' element = {<EditPage/>}/>
        </Routes>
      </BrowserRouter>
    )

}

export default App;
