import React from 'react';
import { useState } from 'react';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useEffect } from 'react';
import { MdArrowDropDown } from 'react-icons/md';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const AllPetsAdmin = () => {
    const [pets, setPets] = useState([]);
    const axiosSecure = useAxiosSecure();
  
    useEffect(() => {
      fetch(`https://serversite-pet-adoption.vercel.app/pets`)
        .then((response) => response.json())
        .then((data) => {
          console.log('Fetched users:', data);
          setPets(data);
        })
        .catch((error) =>
          console.error('Error fetching my added pets:', error)
        );
    }, []);
  
    const updatePetStatusLocally = (petId, newStatus) => {
      setPets((prevPets) =>
        prevPets.map((pet) =>
          pet._id === petId ? { ...pet, adopted: newStatus } : pet
        )
      );
    };
  
    const handleChangeAdopted = (pet) => {
      const petId = pet._id;
  
      // Optimistically update the local state
      updatePetStatusLocally(petId, true);
  
      axiosSecure
        .patch(`/admin/adopted/${petId}`)
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
              title: 'Change the adoption Status successfully',
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((error) => {
          // Revert the local state if the request fails
          updatePetStatusLocally(petId, false);
          console.error('Error updating adoption status:', error);
        });
    };
  
    const handleChangeNotAdopted = (pet) => {
      const petId = pet._id;
  
      // Optimistically update the local state
      updatePetStatusLocally(petId, false);
  
      axiosSecure
        .patch(`/admin/notadopted/${petId}`)
        .then((res) => {
          console.log(res.data);
          if (res.data.modifiedCount === 0) {
            // Revert the local state if the request fails
            updatePetStatusLocally(petId, true);
            console.error('Failed to update adoption status.');
          } else {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Change the adoption Status successfully',
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
            fetch(`https://serversite-pet-adoption.vercel.app/pets/${_id}`, {
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
        <div>
        <div>

        </div>
        <div className="overflow-x-auto">
<table className="table">
{/* head */}
<thead>
  <tr>
  <th>Pet Image</th>
    <th>Category</th>
    <th>Name</th>
     <th>Adoption Status</th>
    <th>Change Status</th>
    <th></th>
  </tr>
</thead>
<tbody>
  {/* row 1 */}
  {pets.map(pet => (
          <tr key={pet._id}>
 
   
    <td>
      <div className="flex items-center gap-3">
        <div className="avatar">
          <div className="mask mask-squircle w-12 h-12">
            <img src={pet.image} />
          </div>
        </div>
        
      </div>
    </td>
    <td>
     {pet.category}
      
    </td>
    <td>{pet.name}</td>
    <td>{pet.adopted ===true?'Adopted':'Not Adopted'}</td>
    <th>
      <button
        onClick={() => handleChangeAdopted(pet)}
        className='btn btn-xs btn-success mx-4'
        disabled={pet.adopted === true}
      >
        Adopted
      </button>
      <button
        onClick={() => handleChangeNotAdopted(pet)}
        className='btn btn-xs btn-info'
        disabled={pet.adopted === false}
      >
        Not Adopted
      </button>
    </th>
    <th>
    <Link to={`../updatepet/${pet._id}`}> <button  className='btn  btn-xs btn-warning text-white mx-4'>Update</button></Link>
        <button  onClick={() => deletePet(pet._id)} className='btn btn-xs  btn-accent text-white'>Delete</button>
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

export default AllPetsAdmin;