import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Notification from "./components/notification/Notification";
import Feed from "./components/post/Feed";
import './App.css';

export default function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/:email/notification" element={<Notification />} />
          <Route path="/:email" element={< Feed />} />
          </Routes>

      </BrowserRouter>

      
    </div>

  );
}