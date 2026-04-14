import React from 'react'

function HeroSection() {
  return (
    /*<div className='h-[250px] w-[85%] bg-[#064d4f] mx-auto mt-[30px] rounded-[30px] overflow-hidden flex items-center justify-between pl-10 pr-10'>
        <div className='w-[70%] overflow-hidden'>
            <h1 className=' text-[25px] font-semibold text-white leading-tight'>Get your favorite food delivered.</h1>
            <p className='text-gray-50 mt-5 text-[12px] leading-relaxed'>Explore meals you love, <br/> Choose from a variety of restaurants and enjoy quick delivery at your convenience.</p>
            <button className='mt-6 bg-white text-[#064d4f] px-6 py-3 rounded-2xl font-semibold hover:bg-gray-200 transition'>Order Now</button>
        </div>
        <div className='w-[30%] flex justify-end py-5'>
            <img src='/heroimg.png' alt='heroimage' className='h-[100%] object-contain'/>
        </div>
    </div> */
    <div className='h-[627px] w-full bg-[#fff7e2] flex items-center justify-between pl-[80px] mb-[30px]'>
        <div className='w-[40%] mb-[140px]'>
            <h1 className='text-[60px] font-bold text-[#064d4f] leading-tight'>Get your favorite <br/> food delivered.</h1>
            <p className='mt-3 text-[18px] text-[#126164] italic'>Explore meals you love, <br/> Choose from a variety of restaurants and enjoy quick delivery at your convenience.</p>
            <button className='mt-6 text-white bg-[#064d4f] px-7 py-3 rounded-xl hover:bg-[#126164]'>Order Now</button>
        </div>
        <div className='flex justify-end pt-[40px]'>
            <img src="/bgimage.jpeg" alt="heroimage" className='h-[100%] w-[100%] object-contain'/>
        </div>
    </div>
  )
}

export default HeroSection
