import React from 'react';
import { useLoaderData } from 'react-router-dom';

import SugestedDonationCamp from './sugestedDonationcamp/SugestedDonationCamp';

const DonationCampaignDetails = () => {
    const campdetails=useLoaderData();

    const {image,shortdesp,longdesp,last_donation_date,max_donation_limit}=campdetails;
    return (
        <div>
            <div className="relative flex flex-col justify-center items-center  lg:flex-row bg-clip-border mt-20 border-pink-700 border-2 p-10 mx-auto rounded-xl bg-white text-gray-700 shadow-md w-full max-w-[48rem] ">
  <div
    className="relative w-2/5 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
    <img
      src={image}
      alt="card-image" className="object-cover w-full h-full rounded-full " />
  </div>
  <div className="p-6 lg:border-l-2 border-none border-pink-700 ml-10">
    <h6
      className="block mb-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700 uppercase">
      {last_donation_date}
    </h6>
    <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
     {max_donation_limit}
    </h4>
    <p className="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
     {shortdesp}
    </p>
    <p className="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
     {longdesp}
    </p>
    <a href="#" className="inline-block"><button
        className="flex bg-pink-700 text-white items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
        type="button">
       Donate Now<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          strokeWidth="2" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
        </svg></button></a>
  </div>
</div>  
<div className='flex flex-col items-center justify-center text-3xl font-bold mt-10'><h3>_Suggested For You_</h3>
<p className='text-xl bg-green-500 px-6 py-2 mt-4 rounded-md'>Donate More</p></div>
<SugestedDonationCamp></SugestedDonationCamp>
        </div>
    );
};

export default DonationCampaignDetails;