import React, { useEffect, useState } from 'react'
import InputElement from '../signinupcomponents/input'
import PasswordInput from '../signinupcomponents/passwordInput'
import RoleSelector from '../signinupcomponents/roleSelector'
import {Link, useNavigate} from 'react-router-dom'
import { FcGoogle } from "react-icons/fc"
import { RxCross2 } from "react-icons/rx"
import axios from "axios"
import { serverUrl } from '../App'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { firebaseauth } from '../../firebase'
import { ClipLoader } from "react-spinners"
import { useDispatch } from 'react-redux'
import {setUserData} from '../redux/userSlice'
import { showToast } from '../redux/toasterSlice'


function Signup() { 
    const PrimaryColor = "#064d4f";
    const HoverColor = "#0b5255";
    const BgColor = "#fff9f6";
    const BorderColor = "#ddd";
    {/*UseState ek brain ki tarah hota h jo track krta h user n kya select kr rkha h ya kya type kr rkha h aur jaise jaise change hotabh fir vo info update rkhta h */}
    const [role,setRole] = useState("user");
    const [FullName, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const HandleSignUp = async () => {
        try{
            setLoading(true);
            const result = await axios.post(`${serverUrl}/api/auth/signup`,
                { FullName,
                    email,
                    mobile,
                    password,
                    role,
                    repassword}, 
                {withCredentials : true});

            //console.log("The result after post signup route is :",result.data);

            if(result.data && result.data.user){ 
                console.log("(Signup.jsx) Dispatch data sent :",result.data.user);
                dispatch(setUserData(result.data.user));
                navigate("/");
            } else {
                console.log("(Signup.jsx) Dispatch data sent : null");
            } 

            setLoading(false);
        }
        catch(err){
            dispatch(showToast(err?.response?.data?.message || "Something went wrong?"));
            setLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
        try{
            setLoading(true);
            const provider = new GoogleAuthProvider();

            provider.setCustomParameters({
                prompt : "select_account"  //yeh ensure krta h ki user ko apne google accounts me se ek select krne ka option mile, chahe vo pehle se sign in ho ya na ho
            }); 

            const result = await signInWithPopup(firebaseauth,provider);

            const {displayName, email} = result.user;
            const userresult = await axios.post(`${serverUrl}/api/auth/google-auth`,{
                FullName : displayName,
                email,
                role
            }, {withCredentials : true}
            );
            
            console.log("Result after google signup :",userresult.data);

            if(userresult.data && userresult.data.user){ 
                dispatch(setUserData(userresult.data.user));
                if(userresult.data.user.mobile){
                    navigate("/");
                    return;
                } else {
                    dispatch(showToast("You're almost there! Just a few more details to complete your registration."));
                    navigate("/add-phone");
                }
            } else {
                console.log("(Signup.jsx) Dispatch data sent : null");
            } 

            setLoading(false);
        }
        catch(err){
            dispatch(showToast(err?.response?.data?.message || "Something went wrong?"));
            console.log("Error in google auth frontend route :",err);
            setLoading(false);
        }
    };

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
                required={true}
                onChange={(e) => setFullname(e.target.value)}
            />

            {/*EMAIL*/}
            <InputElement 
                id = "email"
                value = {email}
                label = "Email"
                placeholder= "Enter your Email here."
                type = "email"
                required={true}
                onChange={(e) => setEmail(e.target.value)}
            />

            {/*MOBILE NUMBER*/}
            <InputElement
                id = "mobile"
                value = {mobile}
                label = "Mobile"
                placeholder= "Enter your Mobile Number here."
                type = "tel"
                required={true}
                onChange={(e) => setMobile(e.target.value)}
            />

            {/*PASSWORD*/}
            <PasswordInput
                id = "password"
                value = {password}
                label = "Password"
                required={true}
                placeholder = "Create your own password"
                onChange={(e) => setPassword(e.target.value)}
            />

            {/*PASSWORD*/}
            <PasswordInput
                id = "repassword"
                value = {repassword}
                label = "Re-enter Password"
                required={true}
                placeholder = "Re-enter your password"
                onChange={(e) => setRePassword(e.target.value)}
            />

            <RoleSelector 
                options = {["user","owner","deliveryBoy"]}
                selected = {role}
                setSelected = {setRole}
                bgColor={PrimaryColor}
                borderColor={PrimaryColor} 
                required={true}
            />

            <button className={`w-full mt-4 flex items-center justify-center gap-2 border rounded-lg cursor-pointer px-4 py-2 transition duration-200 bg-[#064d4f] text-white hover:bg-[#0b5255]`}
                onClick={HandleSignUp} disabled={loading}>
                    { loading ? <ClipLoader size={20} color='white'/> : "Sign Up"}
            </button>

            <button className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-100 cursor-pointer' 
                onClick={handleGoogleSignup}>
                <FcGoogle size={20} />
                <span>Sign up with Google</span>
            </button>

            <p className={`mt-4 ms-2 text-center cursor-pointer`}>
                Already have an account ? {" "}
                <Link to="/signin" className='font-bold hover:underline text-[#064d4f]'>Sign In</Link>
            </p>
        </div>

    </div>
  )
}

export default Signup
