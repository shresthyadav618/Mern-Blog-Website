
import "../App.css";
import { onAuthStateChanged , getAuth , signOut } from "firebase/auth";
import {app} from "../firebase/firestore"
import './Header.css'
import { useContext, useEffect, useState } from "react";
import {Link} from "react-router-dom"
import Logo from "../assets/logo_main.jpg";
import { MyContext } from "./Context";
export default function useHeader(){

const auth = getAuth(app);
const {allBlogs,changeBlogs} = useContext(MyContext);
const [prevBlog, changePrevBlog] = useState(allBlogs);
console.log(allBlogs);
const [visible,changeVisiblity] = useState(false);
function handleSearch(){
    if(visible===true){
        
        changeVisiblity(false);
        return;

    }
    changeVisiblity(true);
   
}
const [search,changeSearch] = useState(null);
function handleForm(e){
    e.preventDefault();
    console.log('you searched for blog title : ', search);
    const location = (window.location.href);
    const x = location.split('/')[4];
    let filtered = allBlogs;
if(x!==undefined){
    console.log('it enters to filter on basis of type', x);
    filtered = allBlogs.filter((arr)=>
    arr.type===x
    )
}
    const realSearch = search.toLowerCase();
    let newFilter = [];
    if(filtered!==undefined){
    newFilter = filtered.filter((arr)=>{
    console.log('insde the main filter')
    const myTitle = arr.title.toLowerCase();
    return myTitle.includes(realSearch);
   });}
   changePrevBlog(allBlogs);
   changeBlogs(newFilter);

}

const [user,changeUser] = useState(auth.currentUser);
if(user){
    console.log('logged in ', user);
}else{
    console.log('logged out',auth.currentUser)
}

function handleClick(e){
   
    alert('Are you sure you want to logout?');
signOut(auth).then(()=>changeUser(null)).catch((err)=>{
    console.log('there was some error while signing out', err);
})
}

useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
        if(user){
            changeUser(user);
        }else{
            changeUser(null);
        }
    })
})
const [burger,changeBurger] = useState(false);
function hamburgerDisplay(){
changeBurger(true);
}

return (
    <>
    {burger && <div className="ham__burger">
        <ul className="burger__list">
            <li> <Link to="/"> Home</Link></li>
            <li> <Link to="/single/technology"> Technology</Link></li>
            <li> <Link to="/single/politics"> Politics</Link></li>
            <li> <Link to="/single/education"> Education</Link></li>
            <li> <Link to="/single/healthcare"> Healthcare</Link></li>
           {!user && <><li> <Link to="/login"> Login</Link> </li> <li> <Link to="/register"> Register</Link></li></>}
           {user && <><li> <Link to="/new-post"> Create</Link> </li> <li> <Link onClick={handleClick}> Logout</Link></li></>}
        </ul>
        <i class="fa-solid fa-xmark" onClick={()=>{
            changeBurger(false);
        }}></i>
        </div>}
   {visible &&  <div className="search__parent">
    
    <div className="toggle__search">
        <form onSubmit={handleForm}>
        <input placeholder="Enter the title " onChange={(e)=>{
            changeSearch(e.target.value);
        }}></input>
        <i class="fa-solid fa-xmark" onClick={()=>{
            changeVisiblity(false);
        }}></i>
        </form>
    </div>

    </div>}
    <div className="header__first">
<div className="getspace">
    <a href="https://www.linkedin.com/in/manu-yadav-b44889208/"><i class="fa-brands fa-linkedin-in"></i></a>
<a href="https://twitter.com/ManushresthY"><i class="fa-brands fa-twitter"></i></a>
<a href="https://github.com/manushresthyadav"><i class="fa-brands fa-github"></i></a>
<a href="https://www.instagram.com/shresth_manuuu/?next=%2F"><i class="fa-brands fa-instagram"></i></a>



</div>

<div className="getflex">
    <div>MANU</div>
   <div className="getclrred">SHRE</div>
   <div>STH</div>
</div>

<div className="header__first__right">
    <div className="header__burger" onClick={hamburgerDisplay}>
        <div></div>
        <div></div>
        <div></div>
    </div>
    <i class="fa-solid fa-magnifying-glass" onClick={handleSearch}></i>
</div>

</div>
   
    <header className='header__container'>


<div className="header__content">
    <div>
    <Link to="/">HOME</Link>
    <Link to="/single/technology">TECHNOLOGY</Link>
    <Link to="/single/politics">POLITICS</Link>
    <Link to="/single/education" className="getclrred">EDUCATION</Link>
    <Link to="/single/healthcare">HEATHCARE</Link>
    {! user &&  <><Link to="/login">LOGIN</Link> <Link to="/register">REGISTER</Link></>}
    {user && <> <Link to="/new-post"> CREATE </Link> <div onClick={handleClick} className="crp"> LOGOUT </div>  </> }
    </div>
</div>

    
  </header>
<div className="parent__refresh__btn">
  <button className='refresh__btn' onClick={()=>{
    changeBlogs(prevBlog);
  }}>Refresh</button>
  </div>
  </>
)

}


{/* <Link to="/">My Blog</Link>
    <nav>
        {!user && <>  <Link to='/login'>Login</Link>
      <Link to='/register'>Register</Link></>}
  
{user && <>
<Link to="/new-post">Create new post</Link>

<a onClick={handleClick}>Logout</a>
</>}

    </nav> */}