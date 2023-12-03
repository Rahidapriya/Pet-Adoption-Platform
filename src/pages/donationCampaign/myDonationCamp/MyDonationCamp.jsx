import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../components/providers/AuthProvider';
import { Link, useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyDonationCamp = () => {
  const { user } = useContext(AuthContext);
  const [donationCamp, setDonationCamp] = useState([]);
  const [filteredDonationCamp, setFilteredDonationCamp] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  // const donation=useLoaderData();
  // const{_id,name,max_donation_limit,}=donation;
  const axiosSecure = useAxiosSecure();
  // const [allCamps,setAllCamps]=useState([])
  useEffect(() => {
    fetch('http://localhost:5007/adddonationcamp')
      .then(response => response.json())
      .then(data => setDonationCamp(data))
      .catch(error => console.error('Error fetching donation:', error));
  }, []);

  useEffect(() => {
    if (user && user.email) {
      setFilteredDonationCamp(donationCamp.filter(donation => donation.userEmail === user.email));
    }
  }, [donationCamp, user]);

  const calculateProgress = (donated, max) => {
    return (donated / max) * 100;
  };

  const updatePetStatusLocally = (petId, newStatus) => {
    setFilteredDonationCamp((prevPets) =>
      prevPets.map((pet) =>
        pet._id === petId ? { ...pet, pause: newStatus } : pet
      )
    );
  };
  const handleTogglePauseResume = (donation) => {
    const petId = donation._id;

    // Check if the donation is currently paused
    const isPaused = donation.pause;

    // Optimistically update the local state based on the action
    updatePetStatusLocally(petId, !isPaused);

    // Send the appropriate request based on the current status
    const request = isPaused
      ? axiosSecure.patch(`/admin/resume/${petId}`)
      : axiosSecure.patch(`/admin/pause/${petId}`);

    // Perform the request
    request
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount === 0) {
          // Revert the local state if the request fails
          updatePetStatusLocally(petId, isPaused);
          console.error('Failed to update pause/resume status.');
        } else {
          const actionMessage = isPaused ? 'Resumed' : 'Paused';
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: `Donation ${actionMessage} successfully`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        // Revert the local state if the request fails
        updatePetStatusLocally(petId, isPaused);
        console.error('Error updating pause/resume status:', error);
      });
  };

  // const pauseDonation = (donationId) => {
  //   // Implement the logic to pause the donation with the given donationId
  //   // You may need to send a request to the server to update the donation status
  // };

  // const editDonation = (donationId) => {
  //   // Implement the logic to redirect the user to the edit donation page with the given donationId
  //   // You can use react-router-dom or any routing mechanism for this purpose
  // };

  const viewDonators = (donationId) => {
    // Implement the logic to show a modal with the list of donors for the given donationId
    // You may need to fetch donor information from the server
    setSelectedDonation(donationId);
  };

  const closeModal = () => {
    setSelectedDonation(null);
  };

  return (
    <div className="container mx-auto my-8">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Pet Name</th>
            <th className="py-2 px-4 border-b">Maximum Donation Amount</th>
            <th className="py-2 px-4 border-b">Donation Progress</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
        {filteredDonationCamp.map(donation => (
  <tr key={donation._id}> {/* Assuming _id is a unique identifier */}
    <td className="py-2 px-4 border-b">{donation.name}</td>
    <td className="py-2 px-4 border-b text-center">{donation.max_donation_limit}</td>
    <td className="py-2 px-4 border-b">
      <div className="bg-blue-200 h-6 w-full rounded-full">
        <div
          className="bg-blue-500 h-full rounded-full"
          style={{ width: `${calculateProgress(donation.donatedAmount, donation.max_donation_limit)}%` }}
        ></div>
      </div>
    </td>
              <td className="py-2 px-4 border-b">
              <button
                  className={`${
                    donation.pause ? 'bg-green-500' : 'bg-blue-500'
                  } text-white px-2 py-1 rounded mr-2`}
                  onClick={() => handleTogglePauseResume(donation)}
                >
                  {donation.pause ? 'Resume' : 'Pause'}
                </button>
               <Link to={`../updatedonationcamp/${donation._id}`}> <button className="bg-green-500 text-white px-2 py-1 rounded mr-2" onClick={() => editDonation(donation.id)}>
                  Edit
                </button></Link>
                <button className="bg-indigo-500 text-white px-2 py-1 rounded" onClick={() => viewDonators(donation.id)}>
                  View Donators
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Donators */}
      {selectedDonation !== null && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-gray-800 bg-opacity-50 absolute inset-0"></div>
          <div className="bg-white p-4 rounded z-10">
            <h2 className="text-lg font-semibold mb-4">Donators for Donation</h2>
            {/* Fetch and display donators here */}
            {/* Example: <p>Donator: John Doe, Amount: $50</p> */}
            <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyDonationCamp;
