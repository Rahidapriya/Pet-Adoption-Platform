import React, { useContext, useEffect, useState } from 'react';
import AdoptionReqCard from './AdoptionReqCard';
import { AuthContext } from '../../../components/providers/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AdoptionReq = () => {
  const [pets, setPets] = useState([]);
  const { user } = useContext(AuthContext);
  const [filteredCard, setFilteredCard] = useState([]);
  const [allCamps, setAllCamps] = useState([])

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    fetch(`https://serversite-pet-adoption.vercel.app/addtoadopt`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched pets:', data);
        setPets(data);
      })
      .catch(error => console.error("Error fetching adoption request pets:", error));
  }, []);

  useEffect(() => {
    if (user && user.email) {
      setFilteredCard(pets.filter(pet => pet.ownerEmail === user.email && pet.adopt_Req===true))
    }
  }, [pets, user]);

console.log('request pet',pets);
  // //////
  const updatePetStatusLocally = (petId, newStatus) => {
    setAllCamps((prevPets) =>
      prevPets.map((pet) =>
        pet._id === petId ? { ...pet, adopted: newStatus } : pet
      )
    );
  };
  const handleAccept = (pet) => {
    const petId = pet._id;

    // Optimistically update the local state
    updatePetStatusLocally(petId, true);

    axiosSecure
      .patch(`/admin/accept/${petId}`,{petId:pet.petId,id:pet._id})
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount === 0) {
          // Revert the local state if the request fails
          updatePetStatusLocally(petId,false);
          console.error('Failed to update adoption status.');
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Accept Adoption Request successfully',
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

  const handleReject = (pet) => {
    const petId = pet._id;

    // Optimistically update the local state
    updatePetStatusLocally(petId, false);

    axiosSecure
      .patch(`/admin/reject/${petId}`,{petId:pet.petId,id:pet._id})
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
            title: 'You Have Reject Donation Request successfully',
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
      {filteredCard.length === 0 ? (
        <p className='text-center text-bold text-2xl flex items-center justify-center h-[80vh]'>No adoption requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Requested By</th>
                <th>Phone</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredCard.map((card) => (
                <tr key={card.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="font-bold">{card.userName}</div>
                        <div className="text-sm opacity-50">{card.userAddress}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p>{card.phone}</p>
                  </td>
                  <td>{card.userEmail}</td>
                  <th>
                    
                  {/* disabled={!card.adopted} */}
                    <button onClick={() => handleAccept(card)}    className="btn btn-warning btn-xs">Accept</button>
                    <button onClick={() => handleReject(card)}    className="btn btn-warning btn-xs">Reject</button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdoptionReq;
