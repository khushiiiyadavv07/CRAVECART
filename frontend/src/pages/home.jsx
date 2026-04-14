import React from 'react'
import { useSelector } from 'react-redux'
import UserDashboard from '../components/UserDashboard';
import OwnerDashboard from '../components/OwnerDashboard';
import DeliveryBoy from '../components/DeliveryBoy';

function Home() {
    const {userData} = useSelector(state => state.user);
    //console.log("User data in home page :",userData);
  return (
    <div className='w-full min-h-[100vh] bg-[#fff9f6]'>
        {userData.role === "user" && <UserDashboard />}
        {userData.role === "owner" && <OwnerDashboard />}
        {userData.role === "deliveryBoy" && <DeliveryBoy />}
    </div>
  )
}

export default Home
