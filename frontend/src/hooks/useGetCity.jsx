import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCity } from '../redux/userSlice';

function useGetCity() {
    const dispatch = useDispatch();
    const {userData, isManual} = useSelector(state => state.user);
    //console.log("(useGetCity.jsx) Userdata :",userData);
    //console.log("(useGetCity.jsx) City from store :",city);
    const maptoken = import.meta.env.VITE_MAPBOX_TOKEN;
    
    useEffect(() => {
        //jab device ki location on hogi tbhi hum ye use kr paayenge 
        navigator.geolocation.getCurrentPosition(async (position) => {
            //console.log("Position :",position);
            const {latitude, longitude} = position.coords;

            const result = await axios.get(`https://api.mapbox.com/search/geocode/v6/reverse?longitude=${longitude}&latitude=${latitude}&access_token=${maptoken}`);
            //console.log("Result after backward geocoding :",result);
            const features = result.data.features;
            const context = features[0]?.properties?.context;

            const city = 
                context.place?.name ||
                context.district?.name ||
                context.region?.name ;5555

            //console.log("Current city of user :", city);
            if(!isManual){
                dispatch(setCity(city));
            }
        });
    }, [userData]);
}

export default useGetCity
