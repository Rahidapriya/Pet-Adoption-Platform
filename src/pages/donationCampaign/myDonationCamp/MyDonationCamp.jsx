import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../components/providers/AuthProvider';
import { Link, useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyDonationCamp = () => {
  const { user } = useContext(AuthContext);
  const [donationCamp, setDonationCamp] = useState([]);
  const [viewDonatorsss, setviewDonatorsss] = useState([]);
  const [filteredDonationCamp, setFilteredDonationCamp] = useState([]);
  const [filteredDonator, setFilteredDonator] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);
  // const donation=useLoaderData();
  // const{_id,name,max_donation_limit,}=donation;
  const axiosSecure = useAxiosSecure();
  // const [allCamps,setAllCamps]=useState([])
  useEffect(() => {
    fetch('https://serversite-pet-adoption.vercel.app/adddonationcamp')
      .then(response => response.json())
      .then(data => setDonationCamp(data))
      .catch(error => console.error('Error fetching donation:', error));
  }, []);


// view donator
useEffect(() => {
  fetch('https://serversite-pet-adoption.vercel.app/payments')
    .then(response => response.json())
    .then(data => setviewDonatorsss(data))
    .catch(error => console.error('Error fetching donation:', error));
}, []);
console.log('myself filte',filteredDonator);

useEffect(() => {
  if (user && user.email) {
   
    setFilteredDonator(viewDonatorsss.filter(viewdonator=>viewdonator.donationId==selectedDonation));
  }
}, [ user,viewDonatorsss,selectedDonation]);


console.log('filterfffff',filteredDonator);
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

  const viewDonatorss = (donationId) => {
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
               <Link to={`../updatedonationcamp/${donation._id}`}> <button className="bg-green-500 text-white px-2 py-1 rounded mr-2">
                  Edit
                </button></Link>
                <button className="bg-indigo-500 text-white px-2 py-1 rounded" onClick={() => viewDonatorss(donation._id)}>
                  View Donators
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


{/* Open the modal using document.getElementById('ID').showModal() method */}
{/* <button className="btn" onClick={()=>document.getElementById('my_modal_5').showModal()}>open modal</button>
<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
  <div className="overflow-x-auto">
  <table className="table">
    
    <thead>
      <tr>
        <th></th>
        <th>Serial</th>
        <th>Donators</th>
        <th>Donation Amount</th>
      </tr>
    </thead>
    <tbody>
            {filteredDonator.map((don, index) => (
             
              <tr key={index}>
                 <td>{index+1}</td>
                 <td>{don.email}</td>
                <td>{don.donationAmount}</td>
               
                
                
              </tr>
            ))}
          </tbody>
  </table>
</div>
    <div className="modal-action">
      <form method="dialog">
       
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
  
</dialog> */}



      {/* Modal for Donators */}
      {/* Modal for Donators */}
{selectedDonation !== null && filteredDonator.length > 0 && (
  <div className="fixed inset-0 flex items-center justify-center mx-auto">
    <div className="bg-gray-800 bg-opacity-50 absolute inset-0"></div>
    <div className="bg-white p-4 rounded z-10">
      <h2 className="font-semibold mb-4 text-xl">Donators for Donation</h2>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Donators</th>
              <th>Donation Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredDonator.map((don, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{don.email}</td>
                <td>{don.donationAmount}$</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={closeModal}>
        Close
      </button>
    </div>
  </div>
)}

{/* Message when there are no donors */}
{selectedDonation !== null && filteredDonator.length === 0 && (
  <div className="fixed inset-0 flex items-center justify-center mx-auto">
    <div className="bg-gray-800 bg-opacity-50 absolute inset-0"></div>
    <div className="bg-white p-4 rounded z-10">
      <p>No One donated</p>
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
