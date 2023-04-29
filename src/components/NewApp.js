import { useParams } from "react-router-dom"
import Header from "./Header"
import { useContext, useEffect, useState } from "react";
import Blogs from "./blog";
import Loader from "../Loader";
import { MyContext } from "./Context";
export default function useNewApp(){



const {id} = useParams();
console.log('inside ', id);
const BASE_URL = `https://blog-website-bu2i.onrender.com`;
// const BASE_URL = `http://localhost:4000`;
// const [allBlogs,changeBlog] = useState(null);

const {allBlogs,changeBlogs} = useContext(MyContext);

const val = localStorage.getItem('current');
console.log('the value was', val);



useEffect(()=>{
console.log('inside the useEffect');
localStorage.setItem('current',id);
    async function getBlog(){
        const response  = await fetch(BASE_URL+`/single?type=${id}`);
        if(response.ok){
            const res = await response.json();
            changeBlogs(res);
        }else{
            console.log('there is no blog added yet');
            changeBlogs(null);
        }
    }

    getBlog();

},[val!==id]);

if(!allBlogs || val!==id){
    return (<>
    <Header/>
    <Loader/>
    <div className='no__blog'>Loading the blogs, please wait!</div>
    </>) 
}
else{
return(
    <>
    
    <Header/>
    
    <div>
    {allBlogs && allBlogs.map((blog)=>{
  const x = blog.file.contentType;
  const y = x.split('/')[1];
  return <Blogs title={blog.title} content={blog.content} summary={blog.summary} author={blog.author} time={blog.time} img={blog.path} id={blog._id}/>
})}
    </div>

    </>
   
)

}}