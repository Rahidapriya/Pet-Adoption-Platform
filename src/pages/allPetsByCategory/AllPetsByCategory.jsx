



import Navbar from '../../shared/navbar/Navbar';
import Footer from '../../shared/footer/Footer';
import AllPetsByCategoryCard from './AllPetsByCategoryCard';
import { useLoaderData } from 'react-router-dom';

const AllPetsByCategory = () => {
    const pets=useLoaderData()
    // const [pets, setPets] = useState([]);
    // useEffect(() => {
         
    //       fetch(`https://serversite-pet-adoption.vercel.app/pets?category=${category}`, )
    //         .then(response => response.json())
    //         .then(data => setPets(data))
    //         .catch(error => console.error("Error fetching pets Category:", error));
        
    //   }, []);
 
  if (pets.length === 0) {
    return (
      <div>
        <Navbar></Navbar>
        {/* <AddSlider></AddSlider> */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
  <h2 className='text-center text-3xl font-bold'>No available products</h2>
</div>
<Footer></Footer>
      </div>
    );
  }
    return (
        <div>
            <div>
      <Navbar></Navbar>
     
      <h2 className='text-center text-3xl lg:m-10 font-bold'>Available Pets: {pets.length}</h2>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:gap-10 lg:mx-20 my-16'>
        {pets.map((book) => (
          <AllPetsByCategoryCard key={book._id} book ={book}></AllPetsByCategoryCard>
        ))
    }
      </div>
      <Footer></Footer>
    </div>
        </div>
    );
};

export default AllPetsByCategory;


