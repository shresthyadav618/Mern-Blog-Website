import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from "./components/login"
import Register from "./components/register"
import Post from "./components/Post"
import MainPost from "./components/MainPost";
import EditPost from "./components/EditPost"
import NewApp from "./components/NewApp"
import {BrowserRouter as Router , Routes, Route } from "react-router-dom"
import { MyProvider } from './components/Context';
import Header from "./components/Header"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
       
        <Route path='/' element={
          <MyProvider>
            <Header/>
             <App/>
          </MyProvider>
       
        }></Route>
       
        
        <Route path='/login' element={<MyProvider><Login/></MyProvider>}></Route>
        <Route path='/register' element={<MyProvider><Register/></MyProvider>}></Route>
        <Route path='/new-post' element={<MyProvider><Post/></MyProvider>}></Route>
        <Route path='/blogs/:id' element={<MyProvider><MainPost/></MyProvider>}></Route>
        <Route path='/edit/:id' element={<MyProvider><EditPost/></MyProvider>}></Route>
        <Route path='/single/:id' element={<MyProvider><NewApp/></MyProvider>}></Route>
      </Routes>
    
    </Router>
  </React.StrictMode>
);


