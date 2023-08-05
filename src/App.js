import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Notification from "./components/notification/Notification";
import Feed from "./components/post/Feed";
import Profile from "./components/post/Profile";
import './App.css';

export default function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/feed" element={< Feed />} />
          <Route path="/profile" element={< Profile />} />
          </Routes>

      </BrowserRouter>

      
    </div>

  );
}