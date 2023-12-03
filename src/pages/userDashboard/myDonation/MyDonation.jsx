import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../components/providers/AuthProvider';

const MyDonation = () => {
const {user}=useContext(AuthContext);
    const [mydonations, setMyDonations] = useState([]);
    useEffect(() => {
         
          fetch(`https://serversite-pet-adoption.vercel.app/payments`, )
            .then(response => response.json())
            .then(data => setMyDonations(data))
            .catch(error => console.error("Error fetching pets Category:", error));
        
      }, []);

    return (
        <div>
            
        </div>
    );
};

export default MyDonation;