import React, { useEffect } from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { FiMenu, FiSearch, FiShoppingCart } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import InputElement from '../signinupcomponents/input';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { serverUrl } from '../App';
import { useNavigate } from 'react-router-dom';
import { setUserData } from '../redux/userSlice';


function Navbar() {

    const navigate = useNavigate();
    const dispatch  = useDispatch();
    const [venue, setVenue] = useState("");
    const {userData, isManual} = useSelector(state => state.user);
    const ReduxCity = useSelector(state => state.user.city);
    //console.log("(navbar.jsx) Userdata :",userData);
    //console.log("(navbar.jsx) City from store :",City);
    const [showInfo, setShowInfo] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [inputCity, setInputCity] = useState("");

    useEffect(() => {
        setInputCity(ReduxCity);
    },[ReduxCity]);

    //function for handling logout 
    const handleLogout = async () => {
        try{
            const result = await axios.get(`${serverUrl}/api/auth/signout`, {
                withCredentials : true
            });
            console.log("Result after logout is :",result);
            dispatch(setUserData(null));
            navigate("/signin");
        }
        catch(err){
            console.log("Logout error :", err);
        }
    }


  return (

    <div id='navbar' className='w-full bg-[#064d4f] h-[70px] px-5 py-3 flex items-center justify-between shadow-md sticky top-0 sm:px-8'>

            {showSearch && (         
                <div className='flex items-center bg-white rounded-full px-4 py-3 w-[85%] ml-6 fixed top-[80px] left-[3%] z-[999] lg:hidden'>
                    <FaLocationDot className='text-[#064d4f] text-lg'/>

                    <input
                        type='text'
                        placeholder='Enter City'
                        className='ml-2 w-[50%] outline-none text-sm pr-2' 
                        value={inputCity || ""}
                        onChange={(e) => {
                            setInputCity(e.target.value); 
                        }}
                        
                    />

                    <span className='text-lg mr-3'>|</span>
                    <FiSearch className='text-[#064d4f] text-2xl' />

                    <input
                        type='text'
                        placeholder='Search for restaurant or cuisine'
                        className='ml-2 w-full outline-none text-sm'  
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                    />
                </div>
        )}
        
        {/* Left side components */}
        <div className='flex items-center sm:gap-2 md:gap-3 gap-1.5'>
            <FiMenu className='text-white text-xl cursor-pointer' />
            <h1 className='text-white text-2xl font-semibold mb-1'>Crave-Cart</h1>
        </div>

        {/* Center Component (Search bar)  
        <FiSearch className='text-gray-500' />*/}
        <div className='flex items-center bg-white rounded-full px-4 py-3 w-[35%] ml-6 lg:flex hidden'>
            <FaLocationDot className='text-[#064d4f] text-lg'/>

            <input
                type='text'
                placeholder='Enter City'
                className='ml-2 w-[50%] outline-none text-sm pr-2' 
                value = {inputCity || ""}
                onChange={(e) => {
                    setInputCity(e.target.value);
                    }
                }
            />

            <span className='text-lg mr-3'>|</span>
            <FiSearch className='text-[#064d4f] text-2xl' />

            <input
                type='text'
                placeholder='Search for restaurant or cuisine'
                className='ml-2 w-full outline-none text-sm'  
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
            />
        </div>

        {/* Right side components */}
        <div className='flex items-center gap-[15px] mr-1 md:gap-[20px] md:mr-2'>
            <p className='text-white font-medium hidden lg:block'>
                ⚡Order now and get within <span className='text-yellow-300 font-semibold'>30 mins!</span>
            </p>

            {showSearch ? (
                <RxCross2 className='text-white text-2xl font-bold lg:hidden' onClick={()=>setShowSearch(false)} />
            ) : (
                <FiSearch className='text-white text-2xl font-bold lg:hidden' onClick={()=>setShowSearch(true)} />
            )}

            <div className='relative mr-2'>
                <FiShoppingCart className="text-white text-xl cursor-pointer" />
                <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full'>
                    0
                </span>
            </div>

            <CgProfile className='w-7 h-7 sm:w-8 sm:h-8 sm:mb-1 cursor-pointer text-white cursor-pointer' onClick={()=>{setShowInfo(prev => !prev)}} />

            {showInfo && (<div className='fixed top-[80px] right-[30px] text-[#064d4f] w-[180px] bg-white shadow-2xl rounded-xl p-[20px] flex flex-col gap-[10px] z-[999]'>
                <div className='text-[15px] font-semibold'>{userData.FullName}</div>
                <hr className='text-gray-300'/>
                <div className='text-[15px] font-semibold cursor-pointer hidden lg:block'>My Orders</div>
                <hr className='text-gray-300 hidden lg:block'/>
                <div className='text-[15px] font-semibold cursor-pointer text-red-700' onClick={handleLogout}>Log Out</div>
            </div>
           )}
        </div>

    </div>
  )
}

export default Navbar
