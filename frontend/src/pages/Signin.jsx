import React, {useState, useEffect} from 'react'
import InputElement from '../signinupcomponents/input'
import ButtonElement from '../signinupcomponents/button'
import PasswordInput from '../signinupcomponents/passwordInput'
import {Link} from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import { RxCross2 } from "react-icons/rx";
import { serverUrl } from '../App'
import axios from "axios"

function Signin() {
    const PrimaryColor = "#ff4d2d";
    const HoverColor = "#e64323";
    const BgColor = "#fff9f6";
    const BorderColor = "#ddd";

    const [toast,setToast] = useState(null);
    useEffect(() => {
            if(toast) {
                const timer = setTimeout(()=> {
                    setToast(null);
                }, 6000);
    
                return () => clearTimeout(timer);
            }
        },[toast]);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const HandleSignIn = async () => {
      try{
        const result = await axios.post(`${serverUrl}/api/auth/signin`,
          { email, password},
          {withCredentials : true}
        );
        console.log("The result after post signin route is : ",result);
        setToast("Good to see you again.")
      }
      catch(err){
        setToast(err?.response?.data?.message || "Something went wrong?")
      }
    }
  
    return (
    <div className={'min-h-screen flex items-center justify-center p-4'} style={{backgroundColor : BgColor}}>

      <div className={'bg-white rounded-xl shadow-lg p-9'} style={{width : "550px", border : `1px solid ${BorderColor}`}}>

        <h1 className={`text-center text-3xl font-bold mb-2`} 
            style={{color : PrimaryColor}}>
              CraveCart
        </h1>

        <p className={`text-center text-gray-600 mb-8`}>
            Welcome Back! Let's Get You Fed
        </p>

        {/*EMAIL*/}
            <InputElement 
                id = "email"
                value = {email}
                label = "Email"
                placeholder= "Enter your Email here."
                type = "email"
                onChange={(e) => setEmail(e.target.value)}
            />

        {/*PASSWORD*/}
            <PasswordInput
                id = "password"
                value = {password}
                label = "Password"
                placeholder = "Create your own password"
                onChange={(e) => setPassword(e.target.value)}
            />

        <button className={`w-full mt-4 flex items-center justify-center gap-2 border rounded-lg cursor-pointer px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323]`}
            onClick={HandleSignIn}>
            Sign In
        </button>

        <button className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-100 cursor-pointer'>
            <FcGoogle size={20} />
            <span>Sign up with Google</span>
        </button>

        <Link to="/forgotpassword" className=' font-bold block mt-4 ms-2 mb-2 text-[#ff4d2d] hover:underline'>Forgot password ?</Link>

        <p className={`mt-1 ms-2`}>
          New to CraveCart ? {" "}
          <Link to="/signup" className='font-bold hover:underline text-[#ff4d2d]'>Sign up now</Link>
        </p>

    </div>

      {toast && (
          <div className='fixed bottom-10 right-10 w-80 min-h-[60px] text-center bg-[#ff4d2d] flex justify-center items-center text-white px-4 py-2 rounded-lg shadow-lg gap-3'>
                <p className='text-sm font-sm'>{toast}</p>

                <button onClick={() => setToast(null)} className="ml-auto text-xl opacity-80 hover:opacity-100" >
                  <RxCross2 />
                </button>
          </div>
      )}

    </div>
  )
}

export default Signin

