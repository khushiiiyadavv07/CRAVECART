import React, { useEffect, useState } from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import InputElement from '../signinupcomponents/input';
import {Link, useNavigate} from 'react-router-dom';
//import Otpinput from '../signinupcomponents/otpinput';
import PasswordInput from '../signinupcomponents/passwordInput';
import axios from 'axios';
import { serverUrl } from '../App';
import { RxCross2 } from "react-icons/rx";
import { ClipLoader } from 'react-spinners';
import { showToast } from '../redux/toasterSlice';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Forgotpassword() {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newpassword, setNewpassword] = useState("");
    const [confirmnewpass, Setconfirmpass] = useState("");
    //password reset krne k liye teen alag page nhi bnayenge blki isi page m 3 state bna denge jo ek k baad ek processw hongi
    const [step, setStep] = useState(1);
    const [timer, setTimer] = useState(0);  //timer - 0 button active
    const [disabled, setDisabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();


    const SendOtp = async () => {
        try{
            setLoading(true);
            const result = await axios.post(`${serverUrl}/api/auth/send-otp`,{
                email
            },
            {withCredentials : true});
            //console.log("The result after otp sending is :",result.data);
            dispatch(showToast("Otp sent successfully."));
            setLoading(false);
            setStep(2);
        }
        catch(err){
            //console.log("FULL ERROR ",err);
            //console.log("STATUS ",err?.response?.status);
            //console.log("DATA ",err?.response?.data);
            dispatch(showToast(err?.response?.data?.message || "Something went wrong."));
            setLoading(false);
        }
    }


    const VerifyOtp = async () => {
        try{
            setLoading(true);
            const result = await axios.post(`${serverUrl}/api/auth/verify-otp`,{
                email, otp
            },
            {withCredentials : true});
            //console.log("The result after verifying is :",result.data);
            dispatch(showToast("Otp verified successfully."));
            setLoading(false);
            setStep(3);
        }
        catch(err){
            const data =  err?.response?.data;
            if(data?.redirect){
                navigate(data.redirect, {
                    state : {
                        message : data?.message
                    }
                });
            }
            //console.log("Error while verifying the otp in frontend :",err);
            dispatch(showToast(err?.response?.data?.message || "Something went wrong."));
            setLoading(false);
        }
    }


    const ResetPassword = async () => {
        try{
            setLoading(false);
            const result = await axios.post(`${serverUrl}/api/auth/reset-password`,{
                newpassword, 
                confirmnewpass,
                email
            },
            {withCredentials : true});
            console.log("The result after reseting the password is :",result.data);
            if(result.data && result.data.user){
                dispatch(setUserData(result.data.user));
                dispatch(showToast("Password updated successfully, you can now use your new password for Sign Up or Sign In."));
                setLoading(false);
                navigate("/");
            }
        }
        catch(err){
            console.log("Error while reseting the password in frontend :",err.response?.data);
            dispatch(showToast(err?.response?.data?.message || "Something went wrong."));
            setLoading(false);
        }
    }


    const ResendPass = async () => {
        try{
            setLoading(true);
            setDisabled(true); //button ko disable kr denge 60 secs k liye

            await axios.post(`${serverUrl}/api/auth/resend-otp`,{email});

            let count = 60;
            setTimer(count);

            const interval = setInterval(() => {
                count-- ;
                setTimer(count);

                if(count <= 0){
                    clearInterval(interval);
                    setDisabled(false);
                }
            },1000);
            setLoading(false);
        }
        catch(err){
            setDisabled(false);
            //console.log("Error while resending the otp in frontend :",err);
            dispatch(showToast(err?.response?.data?.message || "Something went wrong."));
            setLoading(false);
        }
    }


  return (
    <div className=' w-full flex items-center justify-center min-h-screen p-4 bg-[#fff9f6]'>
        <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8'>
            <div className='flex items-center gap-4 mb-4'>
                <Link to="/signin"><IoMdArrowRoundBack size={30} className='text-[#064d4f]' /> </Link>
                <h1 className='mb-2 text-2xl font-bold text-center text-[#064d4f]'>Forgot Password ?</h1>
            </div> 

            {step == 1 && 
                <div>
                    <div className='mb-4'>
                        <p className={`text-start text-gray-600 mb-4`}>
                            Enter your email to recieve a verification code.
                        </p>

                        <InputElement
                            id = "email"
                            value = {email}
                            label = "Email"
                            placeholder = "Enter your email"
                            type = "email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <button className='w-full mt-6 flex items-center justify-center gap-2 border rounded-lg cursor pointer px-4 py-2 transition duration-200 bg-[#064d4f] text-white hover:bg-[#0b5255]'
                      onClick={SendOtp}
                      disabled = {loading} >
                        { loading ? <ClipLoader size={20} color='white'/> : "Send Otp"}
                    </button>
                </div>
            }

            {step == 2 && 
                <div>

                    <p className={`text-start text-gray-600 mb-4`}>
                        Enter the 4-digit code sent to your email.
                    </p>

                    <InputElement 
                        placeholder = "Enter the otp here"
                        maxlength={4}
                        id = "otp"
                        label = "Otp"
                        type = "Number"
                        value = {otp}
                        onChange={(e) => setOtp(e.target.value)} 
                    />

                    <div className='flex justify-end'>
                    <button onClick={ResendPass} disabled={disabled} className='text-[#064d4f]' >{disabled? `Resend in ${timer}s` : "Resend Otp"}</button>
                    </div>

                    <button className='w-full mt-6 flex items-center justify-center gap-2 border rounded-lg cursor pointer px-4 py-2 transition duration-200 bg-[#064d4f] text-white hover:bg-[#0b5255]'
                       onClick={VerifyOtp} disabled = {loading} >
                        { loading ? <ClipLoader size={20} color='white'/> : "Verify"}
                    </button>
                </div>
            }

            {step == 3 && 
                <div>

                    <p className={`text-start text-gray-600 mb-4`}>
                        Create a strong password to secure your account.
                    </p>

                    {/*PASSWORD*/}
                    <PasswordInput
                        id = "password"
                        value = {newpassword}
                        label = "New Password"
                        placeholder = "Create a new password"
                        onChange={(e) => setNewpassword(e.target.value)}
                    />

                    {/*PASSWORD*/}
                    <PasswordInput
                        id = "confirmpass"
                        value = {confirmnewpass}
                        label = "Confirm Password"
                        placeholder = "Re-enter your new password"
                        onChange={(e) => Setconfirmpass(e.target.value)}
                    />

                    <button className='w-full mt-6 flex items-center justify-center gap-2 border rounded-lg cursor pointer px-4 py-2 transition duration-200 bg-[#064d4f] text-white hover:bg-[#0b5255]'
                     onClick={ResetPassword} disabled = {loading} >
                        { loading ? <ClipLoader size={20} color='white'/> : "Reset Password"}
                    </button>
                </div>
            }
        </div>
    </div>
  )
}

export default Forgotpassword
