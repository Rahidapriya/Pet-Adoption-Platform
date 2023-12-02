/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";


const PetListingCard = ({card}) => {
    const {_id,image,name,age ,location ,category,addedDate}=card;
    // console.log('petlisting',name,image);
    return (
        <div>
            <div className="card h-96 bg-base-100 shadow-xl">
  <figure><img src={image} alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title">{name}</h2>
    <p>{age}</p>
    <p>{location}</p>
    <p>{category}</p>
    <p>{addedDate}</p>
    <div className="card-actions justify-end">
    <Link to={`../adoptpet/${_id}`}> <button className="btn btn-primary">View Details</button></Link> 
    </div>
  </div>
</div>
        </div>
    );
};

export default PetListingCard;