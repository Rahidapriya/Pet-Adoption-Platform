import React, { useEffect, useState } from 'react';
import SugestedDonationCampCard from './SugestedDonationCampCard';

const SugestedDonationCamp = () => {
    const [donationCamp, setDonationCamp] = useState([]);
    useEffect(() => {
         
          fetch(`https://serversite-pet-adoption.vercel.app/adddonationcamp`, )
            .then(response => response.json())
            .then(data => setDonationCamp(data))
            .catch(error => console.error("Error fetching donation:", error));
        
      }, []);
      console.log(donationCamp);
    return (
        <div>
             <div className='flex flex-col items-center w-full '>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10 lg:my-20 lg:gap-2">
          {donationCamp.slice(0, 3).map(card => (
            <SugestedDonationCampCard key={card._id} card={card} />
          ))}
                </div>
          </div>

        </div>
    );
};

export default SugestedDonationCamp;