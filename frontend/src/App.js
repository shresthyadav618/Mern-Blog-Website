
import './App.css';
import { useState,useEffect, useDeferredValue } from 'react';
import Blog from "./assets/blog.webp";
import { getAuth } from "firebase/auth";
import Header from "./components/Header"
import Blogs from "./components/blog";
import PreLoader from './Loader';

function App() {
const BASE_URL = `https://blog-website-bu2i.onrender.com`;
const [loader,setLoader] = useState(true);

  const auth  = getAuth();
  const [allBlogs,changeBlogs] = useState(null); 



  useEffect(()=>{

  async function getData(){
  
      const resposne = await fetch(BASE_URL+'/blogs');
      if(resposne.ok){
          const res = await resposne.json();
          changeBlogs(res);
          setLoader(false);
      }else{
          console.log('there was some error while fetching the data');
      }
  
  }
  
  getData();
  
  },[])

  return (
    <>
   
    <div className='main__container'>
   
<Header/>
{loader && <PreLoader/>}
<div className='display__container'>





</div>

{allBlogs && allBlogs.map((blog)=>{
  const x = blog.file.contentType;
  const y = x.split('/')[1];
  return <Blogs title={blog.title} content={blog.content} summary={blog.summary} author={blog.author} time={blog.time} img={blog.path} id={blog._id}/>
})}
{!allBlogs && <div className='no__blog'>Loading the blogs, please wait!</div>}
    </div>
    </>
  );
}

export default App;
