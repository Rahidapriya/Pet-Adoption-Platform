import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../../components/providers/AuthProvider';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';
import './MyAddedPets.css'; // You can create a CSS file for styling pagination

const MyAddedPets = () => {
  const { user } = useContext(AuthContext);

  const [filteredPets, setFilteredPets] = useState([]);
  const [pets, setPets] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const petsPerPage = 10;
  const pagesVisited = currentPage * petsPerPage;

  useEffect(() => {
    fetch(`https://serversite-pet-adoption.vercel.app/pets`)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched pets:', data);
        setPets(data);
      })
      .catch(error => console.error('Error fetching my added pets:', error));
  }, []);

  useEffect(() => {
    user &&
      user?.email &&
      setFilteredPets(pets.filter(pet => pet.userEmail === user?.email));
  }, [pets, user]);

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

  const adoptPet = (_id) => {
    const pet = pets.find((pet) => pet._id === _id);

    if (pet && !pet.adopted) {
      fetch(`https://serversite-pet-adoption.vercel.app/pets/${_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ adopted: true }),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Pet adopted successfully:', data);
          setPets(prevPets =>
            prevPets.map(pet =>
              pet._id === _id ? { ...pet, adopted: true } : pet
            )
          );
        })
        .catch(error => console.error('Error adopting pet:', error));
    }
  };

  const pageCount = Math.ceil(filteredPets.length / petsPerPage);

  const changePage = ({ selected }) => {
    setCurrentPage(selected);
  };

  const displayPets = filteredPets
    .slice(pagesVisited, pagesVisited + petsPerPage)
    .map((pet, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>
          <div className='flex items-center gap-3'>
            <div className='avatar'>
              <div className='mask mask-squircle w-12 h-12'>
                <img src={pet.image} alt='Avatar Tailwind CSS Component' />
              </div>
            </div>
          </div>
        </td>
        <td>{pet.name}</td>
        <td>{pet.category}</td>
        <td>{pet.adopted ? 'Adopted' : 'Not Adopted'}</td>
        <td>
          <Link to={`../updatepet/${pet._id}`}>
            <button className='btn btn-warning btn-xs mr-5 text-white'>
              Update
            </button>
          </Link>
          <button
            className='btn btn-error btn-xs mr-5'
            onClick={() => deletePet(pet._id)}
          >
            Delete
          </button>
          {!pet.adopted && (
            <button
              className='btn btn-primary btn-xs'
              onClick={() => adoptPet(pet._id)}
            >
              Adopt
            </button>
          )}
        </td>
      </tr>
    ));

  if (!pets || pets.length === 0) {
    return (
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        >
          <h2 className='text-center text-3xl font-bold'>
            You have not added any pet
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className='flex flex-col lg:flex-row justify-between border-b pb-8 m-20 '>
        <h1 className='font-semibold text-2xl'>My Added Pets</h1>
        <h2 className='font-semibold text-2xl'>
          {filteredPets.length} Added Pets
        </h2>
      </div>
      {filteredPets.length > 0 ? (
        <div>
          <div className='overflow-x-auto'>
            <table className='table w-11/12 mx-auto'>
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Adopt Status</th>
                  <th>Button</th>
                </tr>
              </thead>
              <tbody>{displayPets}</tbody>
            </table>
          </div>
          <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            pageCount={pageCount }
            onPageChange={changePage}
            containerClassName={'pagination flex justify-center mt-4'}
            previousLinkClassName={'pagination__link'}
            nextLinkClassName={'pagination__link '}
            disabledClassName={'pagination__link--disabled'}
            activeClassName={'pagination__link--active'}
          />
        </div>
      ) : (
        <div className='text-center m-10'>
          <p>You Don't Have Added Any pet.</p>
        </div>
      )}
    </div>
  );
};

export default MyAddedPets;
