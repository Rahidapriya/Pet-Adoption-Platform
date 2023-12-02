import React, { useEffect, useState } from 'react';
import AdoptionReqCard from './AdoptionReqCard';

const AdoptionReq = () => {
    const [pets,setPets]=useState([]);

    useEffect(() => {
           
      fetch(`http://localhost:5007/addtoadopt`, )
        .then(response => response.json())
        .then(data =>
          {
              console.log('Fetched pets:', data);
              setPets(data)
          } )
        
        .catch(error => console.error("Error fetching adoption request pets:", error));
    
  }, []);
    return (
        <div className='flex flex-col items-center w-full '>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10 lg:my-20 lg:gap-2">
                              {
                                  pets.map(pet=><AdoptionReqCard key={pet._id} pet={pet}></AdoptionReqCard>)
                              }
              </div>
        </div>
    );
};

export default AdoptionReq;