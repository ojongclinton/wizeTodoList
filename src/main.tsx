import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Todos from "@pages/Todos/Todos.tsx";
import Assignee from "@pages/Assignees/Assignee.tsx";
import "./index.css";
import SideNav from "@layouts/Navigation/SideNav.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <BrowserRouter>
      <div className="grid-container">
        <SideNav />
        <div className="page-content">
          <Routes>
            <Route path="/todos" element={<Todos />} />
            <Route path="/assignees" element={<Assignee />} />
            <Route path="*" element={<p>Not Found</p>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  </>
);
