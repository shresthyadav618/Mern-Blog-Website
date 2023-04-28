
import "../App.css"
import { Link } from "react-router-dom";
import Loader from "../Loader"
export default function blog(props){



return(
    <>
    {/* <Loader/> */}
    <Link to={'/blogs/'+props.id} className="trash">
    <div className='blog__content'>
  <div className='blog__image'>
  <img src={'http://localhost:4000/'+props.img}></img>
  </div>
 <div className='blog__text'>
 <h1>{props.title} </h1>
 <span className='blog__info'> <a className='author'>{props.author}</a> <span>{props.time}</span> </span>
  <span dangerouslySetInnerHTML={{__html: props.summary}} >

  </span>

 </div>


</div>
</Link>
</>
)

}