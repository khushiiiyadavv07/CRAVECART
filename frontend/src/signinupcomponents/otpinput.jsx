import React, { useRef, useState } from 'react'

function Otpinput({setOtp}) {
    const [otpArr, setOtpArr] = useState(["","","",""]);
    const inputsRef = useRef([]);

    //handle input change
    const handleChange = (value, index) => {
        //sirf numbers allow krenge input me
        if(!/^[0-9]?$/.test(value)) return;

        const newOtp = [...otpArr];
        newOtp[index] = value;
        setOtpArr(newOtp);

        setOtp(newOtp.join(""));

        //next input p focus
        if(value &&index < 3) {
            inputsRef.current[index+1].focus();
        }
    };

    //handling backspace
    const handleKeyDown = (e, index) => {
        if(e.key === "Backspace" && !otp[index] && index >0){
            inputsRef.current[index-1].focus();
        }
    };

  return (
    <div style={{ textAlign : "center" }}>
        {/* Label */}
        <label style ={{ display : "block", marginBottom : "10px"}}>Enter OTP</label>

        {/* OTP Boxes */}
        <div className='flex justify-center gap-2'>
            {otp.map((digit, index) => (
                <input 
                    key = {index}
                    type = "tel"
                    maxLength = "1"
                    value = {digit}
                    ref = {(el) => (inputsRef.current[index] = el)}
                    onChange = {(el) => handleChange(el.target.value, index)}
                    onKeyDown = {(e) => handleKeyDown(e, index)}
                    className='text-center font-medium border-[1px] border-[#ccc] rounded-lg focus:border-[#064d4f] focus:outline-none'
                    style = {{width : "50px", height : "50px"}} />
            ))}
        </div>

        {/* For debugging */}
        <p>OTP : {otp.join("")}</p>

    </div>
  )
}

export default Otpinput
