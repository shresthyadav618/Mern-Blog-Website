
import "../App.css"
import { Link } from "react-router-dom";
import Loader from "../Loader"
export default function blog(props){

  const BASE_URL = 'https://blog-website-bu2i.onrender.com';
  // const BASE_URL = `http://localhost:4000`;

return(
    <>
    {/* <Loader/> */}
    <div  className="trash">
    <div className='blog__content'>
  <div className='blog__image'>
  <img src={`${BASE_URL}/`+props.img} onError={(e) => {
    e.target.src = Img
  }}></img>
  </div>
 <div className='blog__text'>
 <h1>{props.title} </h1>
 <span className='blog__info'> <a className='author'>{props.author}</a> <span>{props.time}</span> </span>
  <span dangerouslySetInnerHTML={{__html: props.summary}} className="req__span">

  </span>
  <Link to={'/blogs/'+props.id}><button className="blog__button">Read More</button></Link>

 </div>


</div>
</div>
</>
)

}
