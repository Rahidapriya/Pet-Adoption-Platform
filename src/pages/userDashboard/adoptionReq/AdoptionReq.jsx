import React, { useContext, useEffect, useState } from 'react';
import AdoptionReqCard from './AdoptionReqCard';
import { AuthContext } from '../../../components/providers/AuthProvider';

const AdoptionReq = () => {
    const [pets, setPets] = useState([]);
    const { user } = useContext(AuthContext);
    const [filteredCard, setFilteredCard] = useState([]);

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
            setFilteredCard(pets.filter(pet => pet.ownerEmail === user.email));
        }
    }, [pets, user]);

    return (
        <div>
            {filteredCard.length === 0 ? (
                <p className='text-center text-bold text-2xl'>No adoption requests found.</p>
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
                                        <button className="btn btn-warning btn-xs">Accept</button>
                                        <button className="btn btn-warning btn-xs">Reject</button>
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
