import { createContext, useState } from "react";
export const MyContext = createContext();
export const  MyProvider =({children})=>{


const [allBlogs,changeBlogs] = useState(null);
// see always remember that context will have a provider function having values attribute to it, which provides the valus to the components , it takes a children element which are the components in which we have to provide the values.Context
return(
<MyContext.Provider value={{allBlogs,changeBlogs}} >{children}</MyContext.Provider>
)
}