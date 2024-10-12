import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
createRoot(document.getElementById("root")).render(
  <>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      closeOnClick={true}
      pauseOnHover={true}
      Draggable={true}
      progressStyle={true}
      theme="light"
      bodyClassName="toastbody"
    />
  </>
);
