import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App2 from './App';
import Form from './components/form'
import UserForm from './components/user_form'
import Home from './components/home'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
export default function App() {
  return (
<BrowserRouter>
      <Routes>
        <Route index path="/recommendation"  element={<UserForm />} />
        <Route path="/recommendation/form" element={<Form />} />
        <Route path="/recommendation/products" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
