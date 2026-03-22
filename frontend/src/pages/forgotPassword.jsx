import React, { useState } from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import InputElement from '../signinupcomponents/input';
import {Link} from 'react-router-dom';

function Forgotpassword() {
    const [email, setEmail] = useState("");
    //password reset krne k liye teen alag page nhi bnayenge blki isi page m 3 state bna denge jo ek k baad ek processw hongi
    const [step, setStep] = useState(1);

  return (
    <div className=' w-full flex items-center justify-center min-h-screen p-4 bg-[#fff9f6]'>
        <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8'>
            <div className='flex items-center gap-4 mb-4'>
                <Link to="/signin"><IoMdArrowRoundBack size={30} className='text-[#ff4d2d]' /> </Link>
                <h1 className='text-2xl font-bold text-center text-[#ff4d2d]'>Forgot Password ?</h1>
            </div> 

            {step == 1 && 
                <div>
                    <div className='mb-4'>
                        <InputElement
                            id = "email"
                            value = {email}
                            label = "Email"
                            placeholder = "Enter your email"
                            type = "email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <button className='w-full mt-6 flex items-center justify-center gap-2 border rounded-lg cursor pointer px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323]'>
                        Send Otp
                    </button>
                </div>
            }


        </div>
    </div>
  )
}

export default Forgotpassword
