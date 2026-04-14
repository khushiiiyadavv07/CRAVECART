import React, {useState, useEffect} from 'react'
import InputElement from '../signinupcomponents/input'
import ButtonElement from '../signinupcomponents/button'
import PasswordInput from '../signinupcomponents/passwordInput'
import {Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import { RxCross2 } from "react-icons/rx";
import { serverUrl } from '../App'
import axios from "axios"
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { firebaseauth } from '../../firebase'
import { ClipLoader } from 'react-spinners'
import {setUserData} from '../redux/userSlice'
import { useDispatch } from 'react-redux'
import { showToast } from '../redux/toasterSlice'

function Signin() {
    const PrimaryColor = "#064d4f";
    const HoverColor = "#e64323";
    const BgColor = "#fff9f6";
    const BorderColor = "#ddd";

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const HandleSignIn = async () => {
        try{
            setLoading(true);
            const result = await axios.post(`${serverUrl}/api/auth/signin`,
                { email, password},
                {withCredentials : true}
            );
            //console.log("The result after post signin route is : ",result.data);

            if(result.data && result.data.user){
                console.log("(Signin.jsx) Dispatch data :",result.data.user);
                dispatch(setUserData(result.data.user));
                setLoading(false);
                navigate("/");
            } else {
                console.log("(Singin.jsx) Dispatch data : null");
            }
        }
        catch(err){
            dispatch(showToast(err?.response?.data?.message || "Something went wrong?"));
        }
        finally{
            console.log("Finally block executed, setting loading to false");
            setLoading(false); //hrr case m run krega
        }
    }

    const handleGoogleSignin = async () => {
        try{
            setLoading(true);
            const provider = new GoogleAuthProvider();
            provider.setCustomParameters({
                prompt : "select_account"  //yeh ensure krta h ki user ko apne google accounts me se ek select krne ka option mile, chahe vo pehle se sign in ho ya na ho
            }); 
            const result = await signInWithPopup(firebaseauth,provider);
            console.log(result.user);

            const {email, displayName} = result.user;
            const userresult = await axios.post(`${serverUrl}/api/auth/google-auth-login`,{
                email,
                FullName : displayName
            }, {withCredentials : true}
            );

            if(userresult.data && userresult.data.user){
                //console.log("(Signin.jsx) Dispatch result :",userresult.data);
                if(userresult.data.user.mobile){
                    console.log("(Signin.jsx) Dispatch data :",userresult.data.user);
                    dispatch(setUserData(userresult.data.user)); 
                    navigate("/");
                } else {
                    console.log("(Signin.jsx) Dispatch data :",userresult.data);
                    dispatch(setUserData(userresult.data.user));
                    dispatch(showToast("Almost there! Please add your mobile number to complete your profile."));
                    navigate("/add-phone");
                }
            } else {
                console.log("(Signin.jsx) Dispatch data : null");
            }
        }
        catch(err){
            dispatch(showToast(err?.response?.data?.message || "Something went wrong?"));
        }
        finally{
            console.log("Finally block executed, setting loading to false");
            setLoading(false); //hrr case m run krega 
        }
    };
  
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
                required={true}
                onChange={(e) => setEmail(e.target.value)}
            />

        {/*PASSWORD*/}
            <PasswordInput
                id = "password"
                value = {password}
                label = "Password"
                required={true}
                placeholder = "Enter your password here."
                onChange={(e) => setPassword(e.target.value)}
            />

        <button className={`w-full mt-4 flex items-center justify-center gap-2 border rounded-lg cursor-pointer px-4 py-2 transition duration-200 bg-[#064d4f] text-white hover:bg-[#0b5255]`}
            onClick={HandleSignIn} disabled={loading}>
                {loading ? <ClipLoader size={20} color='white'/> : "Sign In"}
        </button>

        <button className='w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:bg-gray-100 cursor-pointer' onClick={handleGoogleSignin}>
            <FcGoogle size={20}  />
            <span>Sign in with Google</span>
        </button>

        <Link to="/forgotpassword" className=' font-bold block mt-4 ms-2 mb-2 text-[#064d4f] hover:underline'>Forgot password ?</Link>

        <p className={`mt-1 ms-2`}>
          New to CraveCart ? {" "}
          <Link to="/signup" className='font-bold hover:underline text-[#064d4f]'>Sign up now</Link>
        </p>

    </div>

    </div>
  )
}

export default Signin

