
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

function Login() {
const [error, setError] = useState("");
const navigate = useNavigate();
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");


 useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    if (isLoggedIn) {
      navigate("/Home", { replace: true });
    }
  }, [navigate]);

const handleLogin = (e) => {
  e.preventDefault();

  if (email === "web215user@gmail.com" && password === "1234") {
   
    localStorage.setItem("loggedIn", "true");
    setError("");
    navigate("/home");
  } else {
    setError("Invalid credentials");
  }
};



return (
    <div className="min-h-screen  bg-gray-900 text-white">
      <div className=" bg-white p-8 flex flex-col items-center text-black font-mono text-2xl">  {/*This is a comment, this is the top white bar */}
        <p className="text-black">Currently Building.....</p>
      </div>
      <div className="flex flex-col items-center justify-center mt-40">

      <form onSubmit={handleLogin} className="flex flex-col  bg-white w-1/3  p-5 rounded-lg text-black 
       text-2xl shadow-[0_0_30px_rgba(255,255,255,0.2)]">

            <h2 className="text-2xl font-bold text-black mb-10 font-bold text-center">Login</h2>
            <div className="flex flex-col space-y-1 font-mono">
            <label className="text-black mb-1 ">
                Email
            </label>
            <input type="email" className="p-2 rounded bg-gray-700 text-white outline-none mb-10 w-full " placeholder='sma@gmail.com'
            value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="flex flex-col space-y-1 font-mono">
            <label className="text-black mb-1">
                Password
            </label>
            <input type="password" className="p-2 rounded bg-gray-700 text-white outline-none mb-10 w-full " placeholder='password' 
            value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            {error && (
                <p className="text-red-500 text-sm mb-4 text-center">
                    {error}
                </p>
             )}
            <div className="flex justify-center">
            <button type="submit" className="w-40 bg-gray-700 hover:bg-red-700 text-white font-medium p-3 rounded-lg transition mb-10">
                Login
            </button>
            </div>
             <div className="text-sm flex flex-col border-red-500 border-1 rounded-lg w-1/3 mx-auto">
                <p >Email: web215user@gmail.com</p>
                <p>Pass: 1234</p>
            </div>
      </form>

      </div>
      </div>
  );

}

export default Login;