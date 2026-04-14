import React, { useEffect } from 'react'
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import {Navigate, Route, RouterProvider, Routes} from 'react-router-dom'
import useGetCurrentUser from './hooks/useGetCurrentUser'
import { useDispatch, useSelector } from 'react-redux'
import { ClipLoader } from 'react-spinners'
import Forgotpassword from './pages/forgotPassword'
import AddPhone from './pages/addphone'
import Home from './pages/home'
import { RxCross2 } from 'react-icons/rx'
import { hideToast } from './redux/toasterSlice'
import useGetCity from './hooks/useGetCity'

function App() {
    useGetCurrentUser();
    useGetCity();
    const userData = useSelector(state => state.user.userData);
    const { loading } = useSelector(state => state.user);
    //console.log("(App.jsx) Redux update :",userData);

    const {message, show} = useSelector(state => state.toast);
    const dispatch = useDispatch();

    if(loading){
        return ( 
            <div className='flex items-center justify-center min-h-[100vh] min-w-[100vw]'>
                <ClipLoader size={40} color='#064d4f'/>
            </div> 
        );
    }

    return (
        <div>
            <Routes>
                <Route 
                    path = '/signup' 
                    element  = {!userData ? <Signup/> : <Navigate to={'/'}/>} 
                />

                <Route 
                    path = '/signin' 
                    element  = {!userData ? <Signin/> : <Navigate to={'/'}/>} 
                />

                <Route 
                    path = '/forgotpassword' 
                    element  = {!userData ? <Forgotpassword/> : <Navigate to={'/'}/>} 
                />
    
                <Route 
                    path = '/add-phone' 
                    element  = {userData ? (userData.mobile? <Navigate to={"/"}/> : <AddPhone/>) : <Signin/> } 
                />

                <Route 
                    path = '/' 
                    element  = {userData ? (userData.mobile ? <Home/> : <AddPhone/>) : <Navigate to={'/signin'}/>} 
                />

            </Routes>

            {show && (
                <div className='fixed bottom-10 right-10 w-80 min-h-[60px] text-sm text-left bg-[#064d4f] flex justify-center items-center text-white px-4 py-2 rounded-lg shadow-lg z-50'>
                 
                    <p className='text-medium font-medium'>{message}</p>

                    <button 
                        onClick={() => dispatch(hideToast())}
                        className='ml-auto text-xl opacity-80 hover:opacity-100'
                    >
                        <RxCross2/>
                    </button>
                </div>
            )}
        </div>
)};

export const serverUrl = "http://localhost:3000" //this is the url of our backend file
export default App
