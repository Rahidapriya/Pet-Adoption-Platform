import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../components/providers/AuthProvider';

const MyDonationCamp = () => {
  const { user } = useContext(AuthContext);
  const [donationCamp, setDonationCamp] = useState([]);
  const [filteredDonationCamp, setFilteredDonationCamp] = useState([]);
  const [selectedDonation, setSelectedDonation] = useState(null);

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

  const pauseDonation = (donationId) => {
    // Implement the logic to pause the donation with the given donationId
    // You may need to send a request to the server to update the donation status
  };

  const editDonation = (donationId) => {
    // Implement the logic to redirect the user to the edit donation page with the given donationId
    // You can use react-router-dom or any routing mechanism for this purpose
  };

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
            <tr key={donation.id}>
              <td className="py-2 px-4 border-b">{donation.petName}</td>
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
                <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2" onClick={() => pauseDonation(donation.id)}>
                  Pause
                </button>
                <button className="bg-green-500 text-white px-2 py-1 rounded mr-2" onClick={() => editDonation(donation.id)}>
                  Edit
                </button>
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
