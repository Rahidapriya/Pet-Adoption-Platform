
import { NavLink } from 'react-router-dom';
import AddPet from '../addpet/AddPet';
import AdoptionReq from './adoptionReq/AdoptionReq';

const AdoptionReqDashboard = () => {
    const navLinks=<>
    <li><NavLink to="/allusers" className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-[#FF0000] font-bold underline underline-offset-8 hover:text-red  " : ""
                  }>All Users</NavLink></li>
                  <div className=' divider'></div>
   <li><NavLink to="/allusers" className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-[#FF0000] font-bold underline underline-offset-8 hover:text-red  " : ""
                  }>All Users</NavLink></li>
                  <div className=' divider'></div>
    <li><NavLink to="/addpet" className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-[#FF0000] font-bold underline underline-offset-8 hover:text-red  " : ""
                  }>Add a Pet</NavLink></li>
                  <li><NavLink to="/myaddedpets" className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-[#FF0000] font-bold  underline underline-offset-8 hover:text-red  " : ""
                  }>My Added Pets</NavLink></li>
                  <li><NavLink to="/adoptionreq" className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-[#FF0000] font-bold  underline underline-offset-8 hover:text-red  " : ""
                  }>Adoption Request</NavLink></li>
                  <li><NavLink to="/createdonationcamp" className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-[#FF0000] font-bold  underline underline-offset-8 hover:text-red  " : ""
                  }>Create Donation Campaigns</NavLink></li>
                  <li><NavLink to="/mydonationcamp" className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-[#FF0000] font-bold  underline underline-offset-8 hover:text-red  " : ""
                  }>My Donation Campaign</NavLink></li>
                   <li><NavLink to="/mydonation" className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "text-[#FF0000] font-bold  underline underline-offset-8 hover:text-red  " : ""
                  }>My Donation </NavLink></li>
                  <hr />
                   <li className="pt-4 "><NavLink to="/" className={({ isActive, isPending }) =>
                    isPending ? "pending " : isActive ? " text-[#FF0000] font-bold  underline underline-offset-8  hover:text-red " : ""
                  }>Home</NavLink></li>
                 
    
    </>
    return (
        <div className='grid grid-cols-4'>
            <div className=' min-h-[100vh] bg-blue-400 col-span-1 hidden lg:flex'>
         
            <ul className="menu mt-6 z-[1] p-2 dropdown-content text-lg   ">
      {navLinks}
      </ul>
   
            </div>
         
            <div className=' min-h-[100vh] bg-pink-100 lg:col-span-3 col-span-4 '>
            <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
      <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
      {navLinks}
      </ul>
    </div>
              <div>
                <p className='border-y-2 w-4/12 mx-auto text-3xl mt-4 font-bold text-center'>User Dashboard</p>
              </div>
              {/* con */}
             
        <AdoptionReq></AdoptionReq>
            </div>
        </div>
    );
};

export default AdoptionReqDashboard;