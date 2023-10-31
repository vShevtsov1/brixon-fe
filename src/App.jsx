import Home from "./pages/Home.jsx";
import Welcome from "./pages/Welcome.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import SignUpCode from "./pages/SignUpCode.jsx";
import "../src/styles/style.css"
import ObjectInfo from "./pages/ObjectInfo.jsx";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import MyProjects from "./pages/MyProjects.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import MapComponent from "./components/MapComponent.jsx";
import {ReactNotifications} from "react-notifications-component";
import ResetPassword from "./pages/ResetPassword.jsx";
import SetNewPassword from "./pages/SetNewPassword.jsx";
import UpdateProject from "./pages/UpdateProject.jsx";
import MyComponent from "./components/MyPDFComponent.jsx";
import MyPDFComponent from "./components/MyPDFComponent.jsx";
import AllProjects from "./pages/AllProjects.jsx";

function App() {

  return (
      <BrowserRouter>
          <ReactNotifications />
          <Routes>

              <Route path="/" element={<Welcome/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/code" element={<SignUpCode/>}/>
              <Route path="/home" element={<Home/>}/>
              <Route path="/object-info/:projectId" element={<ObjectInfo/>}/>
              <Route path="/my-projects" element={<MyProjects/>}/>
              <Route path="/admin" element={<AdminPanel/>}/>
              <Route path="/map" element={<MapComponent/>}/>
              <Route path="/reques-reset-password" element={<ResetPassword/>}/>
              <Route path="/reset-password" element={<SetNewPassword/>}/>
              <Route path="/update" element={<UpdateProject/>}/>
              <Route path="/pdf" element={<MyPDFComponent/>}/>
              <Route path="/all-projects" element={<AllProjects/>}/>

          </Routes>

      </BrowserRouter>

  )
}

export default App
