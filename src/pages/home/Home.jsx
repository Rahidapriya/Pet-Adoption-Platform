
import { useLoaderData } from 'react-router-dom';
import Navbar from '../../shared/navbar/Navbar';
import AboutUs from './homeComponents/aboutus/AboutUs';
import Action from './homeComponents/action/Action';
import Banner from './homeComponents/banner/Banner';
import Inspiration from './homeComponents/inspiration/Inspiration';
import PetCategory from './homeComponents/petCategory/PetCategory';
import { useEffect, useState } from 'react';
import Footer from '../../shared/footer/Footer';
import Contact from '../../components/contact/Contact';

const Home = () => {
    // const cards=useLoaderData();
   
    const [petsCategory, setPetsCategory] = useState([]);
    useEffect(() => {
         
          fetch(`https://serversite-pet-adoption.vercel.app/PetCategory`, )
            .then(response => response.json())
            .then(data => setPetsCategory(data))
            .catch(error => console.error("Error fetching pets Category:", error));
        
      }, []);
    return (
        <div>
            <Navbar></Navbar>
            <Banner></Banner>
            <div className='flex flex-col items-center w-full '>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 my-10 lg:my-20 lg:gap-2">
                                {
                                    petsCategory.map(card=><PetCategory key={card._id} card={card}></PetCategory>)
                                }
                </div>
          </div>
            {/* <PetCategory></PetCategory> */}
            <Action></Action>
            <Inspiration></Inspiration>
            <AboutUs></AboutUs>
            <Contact></Contact>
            <Footer></Footer>
        </div>
    );
};

export default Home;