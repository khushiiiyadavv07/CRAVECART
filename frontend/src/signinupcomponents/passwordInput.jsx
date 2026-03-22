import { useState } from "react";
import { FaEye } from "react-icons/fa"; //eye icon for viewing or hiding the password
import { FaEyeSlash } from "react-icons/fa";

function PasswordInput({label, value, onChange, placeholder, id}){
    const [showPassword, setShowPassword] = useState(false);
    
    return(
        <div className="mb-4">
            <label htmlFor={id} className="block text-gray-700 font-medium mb-1">
                {label}
            </label>
            <div className="relative">
                <input 
                    id = {id}
                    value = {value}
                    type = {`${showPassword?"text":"password"}`}
                    placeholder = {placeholder}
                    onChange = {onChange}
                    className="w-full rounded-lg px-3 py-2 border border-[#ddd] focus:outline-none focus:border-orange-500"
                />
                <button className="absolute right-3 top-3.25 text-gray-500" 
                    onClick={()=>setShowPassword(prev=>!prev)}>
                    {!showPassword?<FaEye />:<FaEyeSlash />}
                </button>
             </div>
        </div>
    );
}

export default PasswordInput