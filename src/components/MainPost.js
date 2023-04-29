import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import "./MainPost.css";
import "../App.css"
import { getAuth } from "firebase/auth";
import {app} from "../firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPenToSquare} from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import Loader from "../Loader";
export default function (){

    const [loader,setLoader] = useState(true);
const auth = getAuth(app);
let user='';
if(auth.currentUser)
 user = auth.currentUser.uid;
 else{
    user='Manu Shresth';
 };

 const BASE_URL = 'https://blog-website-bu2i.onrender.com';
// const BASE_URL = `http://localhost:4000`;
const {id} = useParams();
console.log(id);
const [blog,changeBlog] = useState(null);
const [reload,changeReload] = useState(false);
useEffect(()=>{

async function getBlog(){

    const resposne = await fetch(`${BASE_URL}/blogs/`+id);
    if(resposne.ok){
        const res = await resposne.json();
        console.log({...res});
        changeBlog({...res});
        setLoader(false);
    }else{
        console.log('there was some error while fetching the blogs');
    }

}

getBlog();

},[reload]);
if(!blog){
    return <Loader/>;
}else{
    return (
        <>
        {loader && <Loader/>}
        <div className="parent__refresh__btn">
  <button className='refresh__btn' onClick={()=>{
    changeReload((prev)=>{
        return !prev;
    })
    setLoader(true);
  }}>Refresh</button>
  </div>
        <div className="main__post">

<div className="main__head">
    <h1>{blog.title}</h1>
    <span>{blog.time}</span>
    <h1>By {blog.author}</h1>
</div>

{user===blog.uid && <div className="main__edit">
<FontAwesomeIcon icon={faPenToSquare} />
<Link to={'/edit/'+ blog._id}> <p>Edit this Post</p></Link>
   
</div>}

            <div className="main__image">
                <img src={`${BASE_URL}/`+blog.path}></img>
            </div>

<div className="main__content">
    <span dangerouslySetInnerHTML={{__html:blog.content}}></span>
</div>

        </div>
        </>
    )
}
}