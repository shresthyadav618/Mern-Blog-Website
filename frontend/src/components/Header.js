
import "../App.css";
import { onAuthStateChanged , getAuth , signOut } from "firebase/auth";
import {app} from "../firebase/firestore"
import { useEffect, useState } from "react";
import {Link} from "react-router-dom"
export default function useHeader(){

const auth = getAuth(app);

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

return (
    <header className='header__container'>
    <Link to="/">My Blog</Link>
    <nav>
        {!user && <>  <Link to='/login'>Login</Link>
      <Link to='/register'>Register</Link></>}
    {
        !user && <div className="hamburger">
<div className="line"></div>
<div className="line"></div>
<div className="line"></div>
            
        </div>
    }
{user && <>
<Link to="/new-post">Create new post</Link>

<a onClick={handleClick}>Logout</a>
</>}

    </nav>
  </header>
)

}