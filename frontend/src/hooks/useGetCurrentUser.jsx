import React, { useEffect, useState } from 'react'
import { serverUrl } from '../App'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {setLoading, setUserData} from '../redux/userSlice'

function useGetCurrentUser() {
    const dispatch = useDispatch();

    useEffect(()=>{
        const fetchUser = async () => {
            dispatch(setLoading(true));
            try{
                const result = await axios.get(`${serverUrl}/api/user/fetch-current-user`,
                    {withCredentials : true}
                );

                //console.log("(getcurrentuser.jsx) Full response after backend data fetching :",result);
                //console.log("(getcurrentuser.jsx) Data got from backend : ",result.data);

                if(result.data && result.data.user){
                    //console.log("(getcurrentuser.jsx) User found from backend :",result.data.user);
                    dispatch(setUserData(result.data.user));
                } else {
                    //console.log("(getcurrentuser.jsx) User not found in backend so reponse is sent null");
                }
            }
            catch(err){
                if(err.response && ( err.response.status === 400 || err.response.status === 401)){
                    dispatch(setUserData(null));
                }
                //console.log(err);
                dispatch(setUserData(null));
            }
            finally {
                dispatch(setLoading(false));
            }
        }
        fetchUser();
    },[dispatch]);
}

export default useGetCurrentUser
