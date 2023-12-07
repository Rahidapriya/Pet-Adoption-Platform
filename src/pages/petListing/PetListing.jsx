/* eslint-disable react-hooks/exhaustive-deps */


import { useEffect, useState } from "react";
import PetListingCard from "./PetListingCard";
import InfiniteScroll from "react-infinite-scroll-component";
import Navbar from "../../shared/navbar/Navbar";



const PetListing = () => {
 
  const [pets, setPets] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [itemsToShow, setItemsToShow] = useState(10); // Initial number of items to show
  const [filteredPets, setFilteredPets] = useState([]); // New state for filtered pets

  useEffect(() => {
    fetchPets();
  }, [selectedCategory, itemsToShow]);

  useEffect(() => {
    // Update filtered pets when the main pet list changes or when the category changes
    filterPetsByCategory();
  }, [pets, selectedCategory]);

  const filterPetsByCategory = () => {
    // If no category is selected, show all pets
    if (!selectedCategory) {
      setFilteredPets(pets);
    } else {
      // Filter pets based on the selected category
      const filtered = pets.filter((pet) => pet.category === selectedCategory);
      setFilteredPets(filtered);
    }
  };
  
  const fetchPets = () => {
    const fetchLimit = itemsToShow;
  
    // Include category parameter only if selectedCategory is not empty
    const categoryParam = selectedCategory ? `&category=${selectedCategory}` : '';
  
    fetch(`https://serversite-pet-adoption.vercel.app/pets?limit=${fetchLimit}${categoryParam}`)
      .then(response => response.json())
      .then(data => {
        // Sort the data by addedDate in descending order
        const sortedData = data.sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate));
  
        setPets(sortedData);
        setHasMore(sortedData.length === fetchLimit);
      })
      .catch(error => {
        console.error("Error fetching pets:", error);
        setHasMore(false);
      });
  };
  const handleScroll = () => {
    setItemsToShow(prevItems => prevItems + 10);
  };

  const handleSearch = () => {
    // Simulate searching (replace with your actual search logic)
    // Note: Adjust the search logic as needed for your application
    const filteredPets = pets.filter(
      pet =>
        pet.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setPets(filteredPets);
  };

  const handleSearchInputChange = event => {
    setSearchQuery(event.target.value);
    // Trigger search as the user types
    handleSearch();
  };

  const handleCategoryChange = event => {
    setSelectedCategory(event.target.value);
    // Fetch new pets when the category changes
    fetchPets();
  };

  
    return (
      <div>
        <Navbar></Navbar>
        <div>
            <p className="text-3xl flex justify-center w-4/12 mx-auto border-y-2 my-20 ">Pet List</p>
        </div>
        <div className='flex flex-col items-center w-full '>
         <div className="flex items-center justify-between flex-1">
         <div>
             {/* Search Bar */}
          <input
            type="text"
            className='block  rounded border border-solid border-neutral-300 bg-white bg-clip-border px-2 py-2 text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary'
            placeholder="Search by pet name"
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
  
         </div>
          {/* Category Dropdown */}
          <div>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className='block ml-2 p-2 rounded border border-solid border-neutral-300 bg-white bg-clip-border text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary'
          >
            <option value="">All Categories</option>
            <option value="Cat">Cat</option>
            <option value="Dog">Dog</option>
            <option value="Bird">Bird</option>
            <option value="Lion">Lion</option>
            <option value="Rabbit">Rabbit</option>
          </select>
          </div>
         </div>
  
         <InfiniteScroll
        dataLength={filteredPets.length} // Use filteredPets instead of pets
        next={handleScroll}
        hasMore={hasMore}
        loading={<div className=" h-[80vh] flex justify-center items-center">
        <div className=" rounded-md h-12 w-12 border-4 border-t-4 border-pink-600 animate-spin "></div>;
        </div>}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 my-10 lg:my-20 lg:gap-2 mx-20">
          {filteredPets.map((card, index) => (
            <PetListingCard key={`${card._id}-${index}`} card={card}></PetListingCard>
          ))}
        </div>
      </InfiniteScroll>
        </div>
      </div>
    );
  };
  
  export default PetListing;


  