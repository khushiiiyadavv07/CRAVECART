import React, { useEffect, useState } from 'react'
import InputElement from '../signinupcomponents/input'
import PasswordInput from '../signinupcomponents/passwordInput'
import RoleSelector from '../signinupcomponents/roleSelector'
import {Link, useNavigate} from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import { RxCross2 } from "react-icons/rx";
import axios from "axios"
import { serverUrl } from '../App'

function Signup() {
    const PrimaryColor = "#ff4d2d";
    const HoverColor = "#e64323";
    const BgColor = "#fff9f6";
    const BorderColor = "#ddd";
    {/*UseState ek brain ki tarah hota h jo track krta h user n kya select kr rkha h ya kya type kr rkha h aur jaise jaise change hotabh fir vo info update rkhta h */}
    const [role,setRole] = useState("user")

    const [toast,setToast] = useState(null);
    useEffect(() => {
        if(toast) {
            const timer = setTimeout(()=> {
                setToast(null);
            }, 6000);

            return () => clearTimeout(timer);
        }
    },[toast]);

    const [FullName, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState("")
    const [password, setPassword] = useState("")

    const HandleSignUp = async () => {
        try{
            const result = await axios.post(`${serverUrl}/api/auth/signup`,{
                FullName,
                email,mobile,password,role
            },
            {withCredentials : true}
            );
            console.log("The result after post signup route is :",result.data);
            setToast("Account created. You're in.")
        }
        catch(err){
            setToast(err?.response?.data?.message || "Something went wrong?")
        }
    }

  return (
    <div className='min-h-screen flex items-center justify-center p-4' 
    style={{backgroundColor : BgColor}}>

        <div className = {`bg-white rounded-xl shadow-lg p-9`} 
            style={{border :`1px solid ${BorderColor}`, width : "550px"}}>

            <h1 className={`text-center text-3xl font-bold mb-2`} 
                style={{color : PrimaryColor}}>
                CraveCart
            </h1>

            <p className={`text-center text-gray-600 mb-8`}>
                Sign Up to Satisfy Your Cravings!
            </p>

            {/*FULL NAME*/}
            <InputElement 
                id = "fullname"
                value = {FullName}  
                label = "Full Name"
                placeholder= "Enter your Full Name here."
                type = "text"
                onChange={(e) => setFullname(e.target.value)}
            />

            {/*EMAIL*/}
            <InputElement 
                id = "email"
                value = {email}
                label = "Email"
                placeholder= "Enter your Email here."
                type = "email"
                onChange={(e) => setEmail(e.target.value)}
            />

            {/*MOBILE NUMBER*/}
            <InputElement
                id = "mobile"
                value = {mobile}
                label = "Mobile"
                placeholder= "Enter your Mobile Number here."
                type = "number"
                onChange={(e) => setMobile(e.target.value)}
            />

            {/*PASSWORD*/}
            <PasswordInput
                id = "password"
                value = {password}
                label = "Password"
                placeholder = "Create your own password"
                onChange={(e) => setPassword(e.target.value)}
            />

            {/*PASSWORD*/}
            <PasswordInput
                label = "Re-enter Password"
                placeholder = "Re-enter your password"
            />

            <RoleSelector 
                options = {["user","owner","deliveryBoy"]}
                selected = {role}
                setSelected = {setRole}
                bgColor={PrimaryColor}
                borderColor={PrimaryColor} 
            />

            <button className={`w-full mt-4 flex items-center justify-center gap-2 border rounded-lg cursor-pointer px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323]`}
                onClick={HandleSignUp}>
                Sign Up
            </button>

            <button className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-100 cursor-pointer'>
                <FcGoogle size={20} />
                <span>Sign up with Google</span>
            </button>

            <p className={`mt-4 ms-2 text-center cursor-pointer`}>
                Already have an account ? {" "}
                <Link to="/signin" className='font-bold hover:underline text-[#ff4d2d]'>Sign In</Link>
            </p>
        </div>

        {toast && (
            <div className='fixed bottom-10 right-10 w-80 min-h-[60px] text-lg text-center bg-[#ff4d2d] flex justify-center items-center text-white px-4 py-2 rounded-lg shadow-lg'>
                <p className='text-medium font-medium'>{toast}</p>
                
                <button onClick={() => setToast(null)} className="ml-auto text-xl opacity-80 hover:opacity-100" >
                    <RxCross2 />
                </button>
            </div>
        )}

    </div>
  )
}

export default Signup
