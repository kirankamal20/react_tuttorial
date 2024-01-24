import * as React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./login.js";
import HomePage from "./home/home_page.js";
import MainPage from "./main_page/main_page.js";
import AddStudents from "./add_student/addstudent.js";
const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/mainPage" element={<MainPage/>} />
        <Route path="/addStudent" element={<AddStudents/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

