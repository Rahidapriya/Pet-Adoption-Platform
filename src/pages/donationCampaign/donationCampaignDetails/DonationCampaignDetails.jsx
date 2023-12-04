import React from 'react';
import { useLoaderData } from 'react-router-dom';

import SugestedDonationCamp from './sugestedDonationcamp/SugestedDonationCamp';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../../userDashboard/payment/CheckoutForm';
import Navbar from '../../../shared/navbar/Navbar';
import Footer from '../../../shared/footer/Footer';

const DonationCampaignDetails = () => {
    const campdetails=useLoaderData();
    const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

    const {image,shortdesp,longdesp,last_donation_date,max_donation_limit,pause}=campdetails;
    console.log('campdet',campdetails);
    return (
        <div>
          <Navbar></Navbar>
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
      Last Donation Time:{last_donation_date}
    </h6>
    <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
     Max Donation Amount:{max_donation_limit}
    </h4>
    <p className="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
     About:{shortdesp}
    </p>
    <p className="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
     {longdesp}
    </p>
    <button disabled={pause} className="btn disabled:cursor-not-allowed bg-pink-700" onClick={()=>document.getElementById('my_modal_5').showModal()}>
       Donate Now<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          strokeWidth="2" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"></path>
        </svg></button>

{/* Open the modal using document.getElementById('ID').showModal() method */}

<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">


 

        <div>
            <div className='text-center'>Donate</div>
            <div>
              
                <Elements stripe={stripePromise}>
                    <CheckoutForm></CheckoutForm>
                </Elements>
            </div>
    
</div>
    {/* <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click the button below to close</p> */}
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>



  </div>
</div>  
<div className='flex flex-col items-center justify-center text-3xl font-bold mt-10'><h3>_Suggested For You_</h3>
<p className='text-xl bg-green-500 px-6 py-2 mt-4 rounded-md'>Donate More</p></div>
<SugestedDonationCamp></SugestedDonationCamp>
<Footer></Footer>
        </div>
    );
};

export default DonationCampaignDetails;