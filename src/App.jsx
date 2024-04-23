import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import DashboardPage from "./components/pages/DashboardPage";
import CollectionPage from "./components/pages/CollectionPage";
import AboutPage from "./components/pages/About";

const App = () => {
    // TODO: add a 404 page
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dashboard/collection" element={<CollectionPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
