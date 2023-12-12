import React from 'react';
import action from '../../../../assets/adoptme.png'
import { BiSolidDonateHeart } from "react-icons/bi";
const Action = () => {
    return (
        <div className='flex flex-col md:flex-row items-center  justify-center'>
            <div>
                <img src={action} className='header w-8/12 mx-auto' alt="" />
            </div>
            <div>
            <hr className='text-[#d42a5c]'/>
            <hr />
               <div className=''>
               <p className='text-6xl'>Save A Pet</p>
               <div className='flex items-center'>
               <p className='text-3xl font-bold my-3'>DONATE NOW</p>
               <BiSolidDonateHeart className='w-10 h-10 text-[#d42a5c]'></BiSolidDonateHeart>
               </div>
               </div>
            <hr />
            <hr />
            </div>
        </div>
    );
};

export default Action;