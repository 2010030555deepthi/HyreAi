import { useState }
from "react";

import { useNavigate }
from "react-router-dom";

function Login() {

 const navigate =
 useNavigate();

 const [email,setEmail] =
 useState("");

 const [password,setPassword] =
 useState("");

 const login = () => {

  if(
   email==="admin@hyreai.com"
   &&
   password==="Admin123"
  ){

   navigate("/dashboard");

  }

  else{

   alert("Invalid Login");

  }

 };

 return (

 <div>

  <h2>Login</h2>

  <input
   placeholder="Email"
   onChange={(e)=>
   setEmail(e.target.value)}
  />

  <br/><br/>

  <input
   type="password"
   placeholder="Password"
   onChange={(e)=>
   setPassword(e.target.value)}
  />

  <br/><br/>

  <button onClick={login}>
   Login
  </button>

 </div>

 );

}

export default Login;