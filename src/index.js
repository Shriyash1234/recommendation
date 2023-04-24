import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Form from './components/form'
import UserForm from './components/user_form'
import Home from './components/collborative'
import Entrypage from './components/entrypage';
import Content from './components/content';
import reportWebVitals from './reportWebVitals';
import PopularProducts from './components/popularproducts';
import { BrowserRouter, Routes, Route } from "react-router-dom";
export default function App() {
  return (
<BrowserRouter>
      <Routes>
        <Route index path="/recommendation"  element={<Entrypage />} />
        <Route path="/recommendation/UserForm"  element={<UserForm />} />
        <Route path="/recommendation/form" element={<Form />} />
        <Route path="/recommendation/products" element={<Home />} />
        <Route path="/recommendation/content-products" element={<Content />} />
        <Route path="/recommendation/popular-products" element={<PopularProducts />} />
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
