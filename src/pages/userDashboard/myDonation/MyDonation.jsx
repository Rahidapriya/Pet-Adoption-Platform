import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../components/providers/AuthProvider';
import Swal from 'sweetalert2';
// import lottie from '../../../hooks/useLottie';
// import { useLottie } from 'lottie-react';

const MyDonation = () => {
const {user}=useContext(AuthContext);
// const lottie=useLottie();
    const [mydonations, setMyDonations] = useState([]);




    const [filteredPets, setFilteredPets] = useState([]);
    const [pets, setPets] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
  
    const petsPerPage = 10;
    const pagesVisited = currentPage * petsPerPage;
  
    // useEffect(() => {
    //   fetch(`https://serversite-pet-adoption.vercel.app/pets`)
    //     .then(response => response.json())
    //     .then(data => {
    //       console.log('Fetched pets:', data);
    //       setPets(data);
    //     })
    //     .catch(error => console.error('Error fetching my added pets:', error));
    // }, []);
  
   

    useEffect(() => {
      fetch(`https://serversite-pet-adoption.vercel.app/payments`)
        .then(response => response.json())
        .then(data => {
          console.log('Fetched payments:', data);
          setMyDonations(data);
        })
        .catch(error => console.error('Error fetching payments:', error));
    }, []);
    
      useEffect(() => {
        user &&
          user?.email &&
          setFilteredPets(mydonations.filter(pet => pet.email === user?.email));
      }, [mydonations, user]);



      const deletePet = (_id) => {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Remove it!'
        }).then((result) => {
          if (result.isConfirmed) {
            fetch(`https://serversite-pet-adoption.vercel.app/payments/${_id}`, {
              method: 'DELETE',
            })
              .then(response => response.json())
              .then(data => {
                console.log('Pet deleted successfully:', data);
                setPets(prevPets => prevPets.filter(pet => pet._id !== _id));
              })
              .catch(error => console.error('Error deleting pet:', error));
          }
        });
      };



    return (
      <div className=''>
      
      <div className="overflow-x-auto bg-white m-10 rounded-md">
<table className="table">
{/* head */}
<thead className=''>
<tr>
<th>Pet Image</th>
  <th>Name</th>
 
  <th>Donation Amount</th>
   
  <th></th>
</tr>
</thead>
<tbody>
{/* row 1 */}
{filteredPets.map(donation => (
        <tr key={donation._id}>

 
  <td>
    <div className="flex items-center gap-3">
      <div className="avatar">
        <div className="mask mask-circle w-12 h-12">
          <img src={donation.image} />
        </div>
      </div>
      
    </div>
  </td>
  <td>
   {donation.name}
    
  </td>
  
  <td>
   {donation.donationAmount}
    
  </td>
  <td><button className='btn btn-sm  bg-gradient-to-r from-pink-700  to-pink-200 text-white' onClick={() => deletePet(donation._id)}>Ask for Refund</button></td>
  {/* <th>
      {user.role === 'Admin'?'Admin':<button onClick={()=>handleMakeAdmin(user)} className="btn btn-primary btn-sm">Make Admin</button>}
    
  </th> */}
</tr>

))}


</tbody>
{/* foot */}


</table>
</div>
  </div>
    );
};

export default MyDonation;