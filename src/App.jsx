import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import DashboardPage from "./components/pages/DashboardPage";
import FileViewPage from "./components/pages/FileViewPage";

const App = () => {
    // TODO: add a 404 page and remove that temporary div
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/files" element={<FileViewPage />} />
        <Route path="*" element={<div>404</div> } />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
