import React from 'react';
import Navbar from '../../shared/navbar/Navbar';
import { useState } from 'react';
import { useEffect } from 'react';
import DonationCampCard from './DonationCampCard';

const DonationCampaign = () => {
    const [donationCamp, setDonationCamp] = useState([]);
    useEffect(() => {
         
          fetch(`http://localhost:5007/adddonationcamp`, )
            .then(response => response.json())
            .then(data => setDonationCamp(data))
            .catch(error => console.error("Error fetching donation:", error));
        
      }, []);
    return (
        <div>
            <Navbar></Navbar>
            <div className='flex flex-col items-center w-full '>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 my-10 lg:my-20 lg:gap-2">
                                {
                                    donationCamp.map(card=><DonationCampCard key={card._id} card={card}></DonationCampCard>)
                                }
                </div>
          </div>

        </div>
    );
};

export default DonationCampaign;