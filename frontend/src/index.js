import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import App from './App';
import { MyProvider } from './components/Context';
import EditPost from "./components/EditPost";
import Header from "./components/Header";
import MainPost from "./components/MainPost";
import NewApp from "./components/NewApp";
import Post from "./components/Post";
import Login from "./components/login";
import Register from "./components/register";
import './index.css';
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


