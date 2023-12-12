/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";



const PetCategory = ({card}) => {
    // console.log(card);
    
    // // const {image,name} = card;
    // console.log('pet category',card.category);
    return (
        <div>
           
      
           <div className=" bg-white my-3 rounded-md 10/12 mx-auto border-gray-300 shadow-lg border-2" >
        <div className="relative mx-4 mt-4 overflow-hidden text-black bg-white  h-72 rounded-xl bg-clip-border">
          <img src={card.image} className="h-full w-64" alt={card.category} />
        </div>
        <div className="p-6 pt-0 font-bold text-2xl text-center mt-2 text-black">
          {card.category}
        </div>
       <div className="mx-3 " ><Link to={`/catagorized_pets/${card.category}`}> <button className="btn w-full py-4 my-4 mx-auto text-white bg-[#087393] hover:bg-[#ff0000] hover:text-white">See More</button></Link></div>
      </div>

  
        </div>
    );
};

export default PetCategory;
  