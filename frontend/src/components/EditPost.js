
import "./post.css";
import Header from "./Header";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {app} from "../firebase/firestore"
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loader from "../Loader"
export default function useEditPost(){

    const Navigate = useNavigate();
const {id} = useParams();
const BASE_URL = 'https://blog-website-bu2i.onrender.com';
// const BASE_URL = `http://localhost:4000`;
const [blog,changeBlog] = useState(null);
useEffect(()=>{

    async function getBlog(){
    
        const resposne = await fetch(`${BASE_URL}/blogs/`+id);
        if(resposne.ok){
            const res = await resposne.json();
            changeData({
                title:res.title,
                summary:res.summary,
                content:res.content,
                file:res.file,
            })
            console.log({...res});
            changeBlog({...res});
        }else{
            console.log('there was some error while fetching the blogs');
        }
    
    }
    
    getBlog();
    
    },[]);
    

   const auth = getAuth(app);
//    console.log(auth.currentUser.displayName)
const [data,changeData] = useState({
    title:'',
    summary:'',
    file:[],
    content:'',
})

function handleSubmit(e){
    e.preventDefault();
    
    console.log('this was submitted', data);
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('summary', data.summary);
    formData.append('content', data.content);
    formData.append('file', data.file);
    // formData.append('type',data.type);
    let x ='';
    let y='';

    if(auth.currentUser.uid){
        y=auth.currentUser.uid;
        }
    if(auth.currentUser.displayName===undefined){
         x = 'Manu Shresth';
    }else{
        x=auth.currentUser.displayName;
    }
    formData.append('author',x);
    formData.append('uid',y);
    const reader = new FileReader();
    if(typeof data.file !== 'object' || data.file === null || !data.file instanceof Blob){
        reader.readAsDataURL(data.file);
        reader.onloadend = function() {
          const base64String = reader.result.split(',')[1];
        formData.append('buffer',base64String);
      
          fetch(`${BASE_URL}/edit/`+id,{
            method:'PUT',
            body: formData,
        })
        Navigate(`/blogs/`+id);
    
    
        }
    }
else{
    console.log('inside the null buffer condition , which we dont want because we selected file (in case if we have)')
    formData.append('buffer',null);
  
    fetch(`${BASE_URL}/edit/`+id,{
      method:'PUT',
      body: formData,
  })
  Navigate(`/blogs/`+id);
}

    




}

if(!blog){
    return <Loader/>;
}else{
    return (
        <>
        <Header/>
        
        <div className="post__container">
<form className="post__form" onSubmit={handleSubmit}>
    <input className="post__title" placeholder="Title"  value={data.title}  onChange={(e)=>{
        changeData((prev)=>{
            return {...prev,title:e.target.value}
        })
    }}></input>
    <input className="post__summary" placeholder="Summary"    onChange={(e)=>{
        changeData((prev)=>{
            return {...prev,summary:e.target.value}
        })
    }} value={data.summary} ></input>


<div className="post__select">
   <label for="my-select">Select Type:</label>
<select id="my-select" name="type" onChange={(e)=>{
    changeData((prev)=>{
        return {...prev,type:e.target.value}
    })
}}>
    <option value="Choose:">Choose:</option>
  <option value="technology">Technology</option>
  <option value="education">Education</option>
  <option value="politics">Politics</option>
  <option value="healthcare">Healthcare</option>
</select>
   </div>

    <input type="file" files={blog.file} className="ip" name="file" onChange={(e)=>{
        changeData((prev)=>{
            return {...prev,file:e.target.files[0]}
        })
    }}></input>
    {/* <textarea className="post__textarea"></textarea> */}
    <ReactQuill value={data.content} onChange={newValue => changeData((prev)=>{return {...prev,content:newValue}})}/>
    <button className="post__btn" >Edit Post</button>
</form>
        </div>
        </>
    )

}
}