/* eslint-disable react/prop-types */

import { Link } from 'react-router-dom';

const SugestedDonationCampCard = ({card}) => {
    const {_id,image,max_donation_limit,shortdesp}=card;
   
        // Check if card is undefined before destructuring
        if (!card) {
          return <div>Error: Card data is undefined</div>;
        }
    return (
        <div>
            <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
  <div
    className="relative h-56 mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
    <img
      src={image}
      alt="card-image" />
  </div>
  <div className="p-6">
    <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
      {max_donation_limit}
    </h5>
    <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit">
     {shortdesp}
    </p>
  </div>
  <div className="p-6 pt-0">
  <Link to={`/donationcampaign`}>
    <button
      className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-warning  text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
      type="button">
      Read More
    </button>
    </Link>
  </div>
</div>  
        </div>
    );
};

export default SugestedDonationCampCard;