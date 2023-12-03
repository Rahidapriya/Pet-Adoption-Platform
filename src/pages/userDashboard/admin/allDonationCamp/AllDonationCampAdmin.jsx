import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AllDonationCampAdmin = () => {
    const[allCamps,setAllCamps]=useState([])
   
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        fetch(`https://serversite-pet-adoption.vercel.app/adddonationcamp`)
          .then((response) => response.json())
          .then((data) => {
            console.log('Fetched users:', data);
            setAllCamps(data);
          })
          .catch((error) =>
            console.error('Error fetching my added donationcamp:', error)
          );
      }, []);

      const deletePet = (_id) => {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            fetch(`https://serversite-pet-adoption.vercel.app/adddonationcamp/${_id}`, {
              method: 'DELETE',
            })
              .then(response => response.json())
              .then(data => {
                console.log('Donation deleted successfully:', data);
                setAllCamps(prevPets => prevPets.filter(pet => pet._id !== _id));
              })
              .catch(error => console.error('Error deleting donation camp:', error));
          }
        });
      };
      const updatePetStatusLocally = (petId, newStatus) => {
        setAllCamps((prevPets) =>
          prevPets.map((pet) =>
            pet._id === petId ? { ...pet, pause: newStatus } : pet
          )
        );
      };
      const handlePause = (pet) => {
        const petId = pet._id;
    
        // Optimistically update the local state
        updatePetStatusLocally(petId, true);
    
        axiosSecure
          .patch(`/admin/pause/${petId}`)
          .then((res) => {
            console.log(res.data);
            if (res.data.modifiedCount === 0) {
              // Revert the local state if the request fails
              updatePetStatusLocally(petId, false);
              console.error('Failed to update adoption status.');
            } else {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'You Have Pause The Donation successfully',
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch((error) => {
            // Revert the local state if the request fails
            updatePetStatusLocally(petId, false);
            console.error('Error updating pause status:', error);
          });
      };
    
      const handleResume= (pet) => {
        const petId = pet._id;
    
        // Optimistically update the local state
        updatePetStatusLocally(petId, false);
    
        axiosSecure
          .patch(`/admin/resume/${petId}`)
          .then((res) => {
            console.log(res.data);
            if (res.data.modifiedCount === 0) {
              // Revert the local state if the request fails
              updatePetStatusLocally(petId, true);
              console.error('Failed to update pause status.');
            } else {
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'You Have Resume The Donation successfully',
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch((error) => {
            // Revert the local state if the request fails
            updatePetStatusLocally(petId, true);
            console.error('Error updating adoption status:', error);
          });
      };
    return (
        <div>
        <div>

        </div>
        <div className="overflow-x-auto">
<table className="table">
{/* head */}
<thead>
  <tr>
  <th>Pet Image</th>
    <th>Max Donation</th>
    <th>Added By</th>
     <th>Last Donation Date</th>
    <th></th>
    <th></th>
  </tr>
</thead>
<tbody>
  {/* row 1 */}
  {allCamps.map(allCamp => (
          <tr key={allCamp._id}>
 
   
    <td>
      <div className="flex items-center gap-3">
        <div className="avatar">
          <div className="mask mask-squircle w-12 h-12">
            <img src={allCamp.image} />
          </div>
        </div>
        
      </div>
    </td>
    <td>
    <p> {allCamp.max_donation_limit}$</p>
      
    </td>
    <td className='text-blue-400'>{allCamp.userEmail}</td>
    <td>{allCamp.last_donation_date}</td>
    
    <th>
      <button
        onClick={() => handlePause(allCamp)}
        className='btn btn-xs btn-success mx-4'
        disabled={allCamp.pause === true}
      >
        Pause
      </button>
      <button
        onClick={() => handleResume(allCamp)}
        className='btn btn-xs btn-success mx-4'
        disabled={allCamp.pause === false}
      >
        Resume
      </button>
      
    </th>
    <th>
    <Link to={`../updatedonationcamp/${allCamp._id}`}> <button  className='btn  btn-xs btn-warning text-white mx-4'>Edit</button></Link>
        <button  onClick={() => deletePet(allCamp._id)} className='btn btn-xs  btn-accent text-white'>Delete</button>
    </th>
  </tr>

))}

  
</tbody>
{/* foot */}


</table>
</div>
    </div>
    );
};

export default AllDonationCampAdmin;