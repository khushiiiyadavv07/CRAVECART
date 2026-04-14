import React, { useState } from 'react'
import InputElement from '../signinupcomponents/input'
import { serverUrl } from '../App';
import { RxCross2 } from "react-icons/rx"
import axios from "axios"
import { ClipLoader } from 'react-spinners';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../redux/toasterSlice';
import PasswordInput from '../signinupcomponents/passwordInput';

function AddPhone() {

  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMobile = async () => {
    try{
        setLoading(true);
        const updatedresult = await axios.post(`${serverUrl}/api/auth/add-phone`,{mobile},{withCredentials : true});

        console.log("Result after adding phone number to user's profile :",updatedresult);

        if(updatedresult.data.user){
            dispatch(setUserData(updatedresult.data.user));
            dispatch(showToast("All set! Your account is fully secured and ready."));
            setLoading(false);
            navigate("/");
        } else {
            setLoading(false);
        }
    }
    catch(err){
        dispatch(showToast(err?.response?.data?.message || "Something went wrong?"));
        setLoading(false);
    }
  }

  return (
    <div>
        <div className=' w-full flex items-center justify-center min-h-screen p-4 bg-[#fff9f6]'>
            <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8'>
                <div className='flex items-center gap-4 mb-4'>
                    <h1 className='mb-2 text-2xl font-bold text-center text-[#064d4f]'>Complete your profile</h1>
                </div> 

                <InputElement
                    label = "Mobile"
                    placeholder = "Enter your mobile number"
                    type = "tel"
                    id = "mobile"
                    value = {mobile}
                    onChange={(e)=>setMobile(e.target.value)}
                />

                <button onClick={handleMobile}
                    className = {'w-full mt-4 flex items-center justify-center gap-2 border rounded-lg cursor-pointer px-4 py-2 transition duration-200 bg-[#064d4f] text-white hover:bg-[#0b5255]'}
                    disabled = {loading}
                    >
                    { loading ? <ClipLoader size={20}/> : "Update Profile" }
                </button>

            </div>
        </div>

    </div>
  )
}

export default AddPhone
